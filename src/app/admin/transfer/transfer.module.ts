// file: admin/transfer/transfer.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TransferComponent } from './transfer.component';
// ⚠️ Only import this if you actually have this file
// import { TransferModalComponent } from './transfer-modal.component';

@NgModule({
  declarations: [
    TransferComponent,
    // comment this out if you don’t have it yet:
    // TransferModalComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: ':id', // URL: /admin/transfer/:id
        component: TransferComponent
      }
    ])
  ],
  exports: [
    TransferComponent
  ]
})
export class TransferModule {}
