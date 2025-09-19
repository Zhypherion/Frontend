import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';


import { AddEditComponent } from './add-edit.component';

const routes: Routes = [
  { path: '', component: EmployeesComponent },   // 👈 default = list
  { path: 'add', component: AddEditComponent },
  { path: 'edit/:id', component: AddEditComponent }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
