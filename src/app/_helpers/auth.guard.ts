import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const account = this.accountService.accountValue;
        if (account) {
            // check if route is restricted by role
            if (route.data.roles && !route.data.roles.includes(account.role)) {
                // role not authorized so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorized so return true
            return true;
        }

        // not logged in so redirect to login page with the return url 
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}


// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AccountService } from '@app/_services';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//     constructor(
//         private router: Router,
//         private accountService: AccountService
//     ) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//         const account = this.accountService.accountValue;

//         if (account) {
//             // 🔒 Check if route is restricted by role
//             if (route.data.roles && !route.data.roles.includes(account.role)) {
//                 this.router.navigate(['/']);
//                 return false;
//             }

//             // 🚨 Only allow users with employeeId to access /requests
//             if (state.url.startsWith('/requests') && !account.employeeId) {
//                 this.router.navigate(['/']);
//                 return false;
//             }

//             // ✅ Authorized
//             return true;
//         }

//         // 🚫 Not logged in — redirect to login page
//         this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
//         return false;
//     }
// }
