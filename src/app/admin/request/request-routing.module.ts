import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsComponent } from './requests.component';

import { ApproverComponent } from './approver.component';
const routes: Routes = [
    { path: '', component: RequestsComponent },
    { path: 'approver', component: ApproverComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequestRoutingModule { }
