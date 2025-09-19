import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentsComponent } from './department.component';
import { AddEditComponent } from './add-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DepartmentRoutingModule
  ],
  declarations: [
    DepartmentsComponent,
    AddEditComponent
  ]
})
export class DepartmentModule {}
