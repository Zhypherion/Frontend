// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map, finalize } from 'rxjs/operators';

// import { Employee } from '@app/_models/employee';

// import { environment } from '@environments/environment';
// import { Account } from '@app/_models';

// const baseUrl = `${environment.apiUrl}/accounts`;

// @Injectable({ providedIn: 'root' })
// export class AccountService {
//     private accountSubject: BehaviorSubject<Account | null>;
//     public account: Observable<Account | null>;

//     constructor(
//         private router: Router,
//         private http: HttpClient
//     ) {
//         this.accountSubject = new BehaviorSubject<Account | null>(null);
//         this.account = this.accountSubject.asObservable();
//     }

//     public get accountValue() {
//         return this.accountSubject.value;
//     }

//     login(email: string, password: string) {
//         return this.http.post<any>(`${baseUrl}/authenticate`, { email, password }, { withCredentials: true })
//             .pipe(map(account => {
//                 this.accountSubject.next(account);
//                 this.startRefreshTokenTimer();
//                 return account;
//             }));
//     }

//     logout() {
//         this.http.post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe();
//         this.stopRefreshTokenTimer();
//         this.accountSubject.next(null);
//         this.router.navigate(['/account/login']);
//     }

//     refreshToken() {
//         return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
//             .pipe(map((account) => {
//                 this.accountSubject.next(account);
//                 this.startRefreshTokenTimer();
//                 return account;
//             }));
//     }

//     register(account: Account) {
//         return this.http.post(`${baseUrl}/register`, account);
//     }

//     verifyEmail(token: string) {
//         return this.http.post(`${baseUrl}/verify-email`, { token });
//     }

//     forgotPassword(email: string) {
//         return this.http.post(`${baseUrl}/forgot-password`, { email });
//     }

//     validateResetToken(token: string) {
//         return this.http.post(`${baseUrl}/validate-reset-token`, { token });
//     }

//     resetPassword(token: string, password: string, confirmPassword: string) {
//         return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
//     }

//     getAll() {
//         return this.http.get<Account[]>(baseUrl);
//     }

//     getById(id: string) {
//         return this.http.get<Account>(`${baseUrl}/${id}`);
//     }

//     create(params: any) {
//         return this.http.post(baseUrl, params);
//     }

//     update(id: string, params: any) {
//         return this.http.put(`${baseUrl}/${id}`, params)
//             .pipe(map((account: any) => {
//                 // update the current account if it was updated
//                 if (account.id === this.accountValue?.id) {
//                     // publish updated account to subscribers
//                     account = { ...this.accountValue, ...account };
//                     this.accountSubject.next(account);
//                 }
//                 return account;
//             }));
//     }

//     delete(id: string) {
//         return this.http.delete(`${baseUrl}/${id}`)
//             .pipe(finalize(() => {
//                 // auto logout if the logged in account was deleted
//                 if (id === this.accountValue?.id)
//                     this.logout();
//             }));
//     }

//     // helper methods

//     private refreshTokenTimeout?: any;

//     private startRefreshTokenTimer() {
//         // parse json object from base64 encoded jwt token
//         const jwtBase64 = this.accountValue!.jwtToken!.split('.')[1];
//         const jwtToken = JSON.parse(atob(jwtBase64));

//         // set a timeout to refresh the token a minute before it expires
//         const expires = new Date(jwtToken.exp * 1000);
//         const timeout = expires.getTime() - Date.now() - (60 * 1000);
//         this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
//     }

//     private stopRefreshTokenTimer() {
//         clearTimeout(this.refreshTokenTimeout);
//     }

    
// }



















import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Account } from '@app/_models';

const baseUrl = `${environment.apiUrl}/accounts`;

@Injectable({ providedIn: 'root' })
export class AccountService {
    private accountSubject: BehaviorSubject<Account | null>;
    public account: Observable<Account | null>;

    private refreshTokenTimeout?: any;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // ✅ Load saved account from localStorage
        const savedAccount = localStorage.getItem('account');
        this.accountSubject = new BehaviorSubject<Account | null>(
            savedAccount ? JSON.parse(savedAccount) : null
        );
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue() {
        return this.accountSubject.value;
    }

    // ---------------------- AUTH ----------------------

    login(email: string, password: string) {
        return this.http.post<any>(`${baseUrl}/authenticate`, { email, password }, { withCredentials: true })
            .pipe(map(account => {
                this.setAccount(account);
                return account;
            }));
    }

    logout() {
        this.http.post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer();
        this.accountSubject.next(null);
        localStorage.removeItem('account');
        this.router.navigate(['/account/login']);
    }

    refreshToken() {
        return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
            .pipe(map(account => {
                this.setAccount(account);
                return account;
            }));
    }

    register(account: Account) {
        return this.http.post(`${baseUrl}/register`, account);
    }

    verifyEmail(token: string) {
        return this.http.post(`${baseUrl}/verify-email`, { token });
    }

    forgotPassword(email: string) {
        return this.http.post(`${baseUrl}/forgot-password`, { email });
    }

    validateResetToken(token: string) {
        return this.http.post(`${baseUrl}/validate-reset-token`, { token });
    }

    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
    }

    getAll() {
        return this.http.get<Account[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Account>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((account: any) => {
                if (account.id === this.accountValue?.id) {
                    // Update current account and persist
                    account = { ...this.accountValue, ...account };
                    this.setAccount(account);
                }
                return account;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`)
            .pipe(finalize(() => {
                if (id === this.accountValue?.id)
                    this.logout();
            }));
    }

    // ---------------------- HELPERS ----------------------

    private setAccount(account: Account) {
        localStorage.setItem('account', JSON.stringify(account));
        this.accountSubject.next(account);
        this.startRefreshTokenTimer();
    }

    private startRefreshTokenTimer() {
        if (!this.accountValue?.jwtToken) return;

        const jwtBase64 = this.accountValue.jwtToken.split('.')[1];
        const jwtToken = JSON.parse(atob(jwtBase64));

        // Refresh 1 minute before expiration
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
