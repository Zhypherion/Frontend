import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';


// Existing lazy-loaded modules
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);
const RequestModule = () => import('./requests/request.module').then(x => x.RequestModule);

// New lazy-loaded modules
// const employeeModule = () => import('./admin/employees/employee.module').then(x => x.EmployeeModule);
// const departmentModule = () => import('./admin/departments/department.module').then(x => x.DepartmentModule);
// const requestModule = () => import('./admin/request/request.module').then(x => x.RequestModule);
// const transferModule = () => import('./admin/transfer/transfer.module').then(x => x.TransferModule);
// const workflowsModule = () => import('./admin/workflows/workflows.module').then(x => x.WorkflowsModule);
// const positionsModule = () => import('./admin/positions/position.module').then(x => x.PositionModule);
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'requests', loadChildren: RequestModule, canActivate: [AuthGuard] },

  // ✅ New Pages
  // { path: 'admin/employees', loadChildren: employeeModule, canActivate: [AuthGuard] },
  // { path: 'admin/departments', loadChildren: departmentModule, canActivate: [AuthGuard] },
  // { path: 'admin/requests', loadChildren: requestModule, canActivate: [AuthGuard] },
  // { path: 'admin/workflows', loadChildren: workflowsModule, canActivate: [AuthGuard] },
  // { path: 'admin/transfer', loadChildren: transferModule, canActivate: [AuthGuard] },
  // { path: 'admin/positions', loadChildren: transferModule, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
