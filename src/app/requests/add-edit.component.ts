import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '@app/_services/requests.service';
import { AccountService } from '@app/_services';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html'
})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  isAddMode!: boolean;
  employees: any[] = [];
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
     public accountService: AccountService // 👈 add
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.fb.group({
      type: ['', Validators.required],
      items: ['', Validators.required],
      status: ['Pending'],
      employeeId: ['', Validators.required]
    });

    

    // Load employees for dropdown
    const account = this.accountService.accountValue;

if (account?.id) {
  // Get employee linked to logged-in account
  this.requestService.getAllEmployees().subscribe(emps => {
    const current = emps.find(e => e.account?.id === account.id);
    if (current) {
      this.form.patchValue({ employeeId: current.id });
    }
  });
}


    if (!this.isAddMode) {
      this.requestService.getRequestById(this.id)
        .subscribe(request => this.form.patchValue(request));
    }
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.loading = true;
    if (this.isAddMode) {
      this.createRequest();
    } else {
      this.updateRequest();
    }
  }

  private createRequest() {
    this.requestService.createRequest(this.form.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/requests']);
        },
        error: err => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  private updateRequest() {
    this.requestService.updateRequest(this.id, this.form.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/requests']);
        },
        error: err => {
          console.error(err);
          this.loading = false;
        }
      });
  }
}
