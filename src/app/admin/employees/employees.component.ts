import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '@app/_models/employee';   // 👈 ADD THIS
import { EmployeeService } from '@app/_services/employee.service';
import { AccountService } from '@app/_services/account.service';
import { DepartmentService } from '@app/_services/department.service';
import { PositionService } from '@app/_services/position.service'; 

@Component({
  selector: 'app-employee-form',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
    form!: FormGroup;
    employees: Employee[] = [];
    accounts: any[] = [];
    departments: any[] = [];
    loading: boolean = false; 
    positions: any[] = []; 

    constructor(
      private fb: FormBuilder,
      private employeeService: EmployeeService,
      private accountService: AccountService,
      private departmentService: DepartmentService,
      private positionService: PositionService
    ) {}

    ngOnInit() {
        this.loadEmployees();
        this.form = this.fb.group({
          accountId: ['', Validators.required],
          positionId: [null, Validators.required],
          departmentId: ['', Validators.required], // ✅ CHANGED: Use departmentId
          hireDate: ['', Validators.required],
          status: ['Active', Validators.required]
        });

        // Load accounts & departments
        this.accountService.getAll().subscribe(accounts => this.accounts = accounts);
        this.departmentService.getAll().subscribe(depts => this.departments = depts);
        this.positionService.getAll().subscribe(
      (data: any[]) => {
        this.positions = data;
      },
      (error) => {
        console.error('Error fetching positions:', error);
      }
    );
  
    }
// Helper for easy access to form controls in the template
  get f() { return this.form.controls; }

  
  submit() {
    if (this.form.valid) {
      this.employeeService.create(this.form.value).subscribe(() => {
        alert('Employee created!');
      });
    }
  }

   loadEmployees() {
    this.loading = true;
    this.employeeService.getAll()
      .subscribe({
        next: (employees) => {
          this.employees = employees;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load employees', err);
          this.loading = false;
        }
      });
}
}
