import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Required for ngClass, ngIf, ngFor, date pipe
import { ReactiveFormsModule } from '@angular/forms';
import { ApproverComponent } from './approver.component';
import { RequestRoutingModule } from './request-routing.module';

@NgModule({
  declarations: [
    ApproverComponent
  ],
  imports: [
    CommonModule,         // ✅ Add this
    ReactiveFormsModule,
    RequestRoutingModule
  ]
})
export class ApproverModule { }
