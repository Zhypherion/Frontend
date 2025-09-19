import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeesComponent } from './employees.component';
import { AddEditComponent } from './add-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,           // optional if you use [(ngModel)]
    EmployeeRoutingModule
  ],
  declarations: [
    EmployeesComponent,
    AddEditComponent
  ]
})
export class EmployeeModule { }
