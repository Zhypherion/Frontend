import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RequestsComponent } from './requests.component';
import { AddEditComponent } from './add-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,  // ✅ Required for formGroup, formControlName
    FormsModule,          // (optional) if you want ngModel
    RouterModule.forChild([
      { path: '', component: RequestsComponent },
      { path: 'add', component: AddEditComponent },
      { path: 'edit/:id', component: AddEditComponent }
    ])
  ],
  declarations: [
    RequestsComponent,
    AddEditComponent
  ]
})
export class RequestModule {}
