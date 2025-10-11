import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';

const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);
const employeesModule = () => import('./employees/employee.module').then(x => x.EmployeeModule);
const departmentsModule = () => import('./departments/department.module').then(x => x.DepartmentModule);
const requestsModule = () => import('./request/request.module').then(x => x.RequestModule);
const positionsModule = () => import('./positions/position.module').then(x => x.PositionModule);




const routes: Routes = [
    { path: '', component: SubNavComponent, outlet: 'subnav' },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: OverviewComponent },
            { path: 'accounts', loadChildren: accountsModule },
            { path: 'employees', loadChildren: employeesModule },
            { path: 'departments', loadChildren: departmentsModule },
            { path: 'request', loadChildren: requestsModule },
            { path: 'positions', loadChildren: positionsModule },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }