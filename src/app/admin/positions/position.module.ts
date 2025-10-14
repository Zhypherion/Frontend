import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PositionComponent } from './position.component';
import { PositionRoutingModule } from './position-routing.module';
import { AccountService } from '@app/_services/account.service';
import { DepartmentService } from '@app/_services/department.service';

@NgModule({
  declarations: [PositionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PositionRoutingModule
  ]
})
export class PositionModule {}
