// file: admin/transfer/transfer.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '@app/_services/employee.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.components.html'
})
export class TransferComponent implements OnInit {
  employeeId!: string;
  form!: FormGroup;
  submitting = false;
  message = '';

  departments: any[] = []; // holds the list of departments

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.form = this.fb.group({
      departmentId: ['', Validators.required]
    });

    // Load departments list (adjust API to your backend)
    this.http.get<any[]>('http://localhost:4000/departments').subscribe({
      next: (res) => (this.departments = res),
      error: (err) => console.error('Could not load departments', err)
    });
  }

  submitTransfer(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.message = '';

    const departmentId = this.form.value.departmentId;

    this.employeeService.transferEmployee(this.employeeId, departmentId).subscribe({
      next: (res) => {
        this.submitting = false;
        this.message = res.message || 'Employee transferred successfully!';
        // optional refresh:
        // this.router.navigate(['/admin/employees']);
      },
      error: (err) => {
        this.submitting = false;
        console.error(err);
        this.message = 'Transfer failed. Please try again.';
      }
    });
  }
}
