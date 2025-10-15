// file: employees/add-edit.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../../_services/department.service';
import { EmployeeService, AlertService, AccountService } from '@app/_services';
import { Employee } from '../../_models/employee';
import { PositionService } from '../../_services/position.service'; 

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  id?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;
  private routeSub!: Subscription;

  accounts: any[] = [];
  departments: any[] = [];
  positions: any[] = []; 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private accountService: AccountService,
    private alertService: AlertService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {}

  ngOnInit() {
    // load accounts & departments (async)
    this.accountService.getAll().pipe(first()).subscribe({
      next: (accounts: any[]) => {
        this.accounts = accounts.filter(a => a.status === 'Active');
      },
      error: err => console.error('Error loading accounts', err)
    });

    this.departmentService.getAll().pipe(first()).subscribe({
      next: (departments: any[]) => this.departments = departments,
      error: err => console.error('Error loading departments', err)
    });
    this.positionService.getAll().pipe(first()).subscribe({ // 👈 Add this
      next: (positions: any[]) => this.positions = positions.filter(p => p.status === 'Active'),
      error: err => console.error('Error loading positions', err)
    });

    // watch params (works for both add and edit routes)
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];        // note: can be e.g. 'EMP002' (string)
      this.initForm();

      // === EDIT mode if an id param exists at all ===
      const isEdit = !!this.id;     // treat any non-empty id as edit
      this.title = isEdit ? 'Edit Employee' : 'Create Employee';

      if (isEdit) {
        this.loading = true;
        // call getById with the string id (service adjusted below to accept number|string)
        this.employeeService.getById(this.id!)
          .pipe(first())
          .subscribe({
            next: (x: any) => {
              // normalize hireDate to yyyy-mm-dd for <input type="date">
              const hireDate = x.hireDate ? x.hireDate.substring(0, 10) : '';

              // convert foreign keys to strings so they match <option value="..."> which is string
              this.form.patchValue({
                employeeId: x.employeeId,
                accountId: x.accountId != null ? String(x.accountId) : '',
                position: x.position ?? '',
                departmentId: x.departmentId != null ? String(x.departmentId) : '',
                hireDate,
                status: x.status ?? 'Active'
              });

              this.loading = false;
            },
            error: err => {
              console.error('Error loading employee', err);
              this.alertService.error('Could not load employee record');
              this.loading = false;
            }
          });
      } else {
        // Create mode -> fetch next generated employeeId
        this.employeeService.getNextId()
          .pipe(first())
          .subscribe({
            next: (res: any) => {
              // back-end should return the next code like 'EMP003'
              this.form.get('employeeId')?.setValue(res.nextId);
            },
            error: err => console.error('Error loading next employeeId', err)
          });
      }
    });
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe();
  }

  private initForm() {
    this.submitted = false;
    this.submitting = false;
    this.loading = false;

    this.form = this.formBuilder.group({
      employeeId: ['', Validators.required],
      accountId: ['', Validators.required],
      positionId: ['', Validators.required],
      departmentId: ['', Validators.required],
      hireDate: ['', Validators.required],
      status: ['Active', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) return;

    this.submitting = true;

    const raw = this.form.getRawValue();
    const employeeId = this.form.get('employeeId')?.value;

    let payload: any;
    let request$;
    let message: string;

    if (this.id) {
      // update by id (id may be string code)
      payload = { ...raw, employeeId };
      request$ = this.employeeService.update(this.id!, payload);
      message = 'Employee updated';
    } else {
      // create
      payload = { ...raw, employeeId };
      request$ = this.employeeService.create(payload);
      message = 'Employee created';
    }

    request$.pipe(first()).subscribe({
      next: () => {
        this.alertService.success(message, { keepAfterRouteChange: true });
        this.router.navigateByUrl('/admin/employees');
      },
      error: (error: any) => {
        this.alertService.error(error);
        this.submitting = false;
      }
    });
  }
}
