// import { catchError, of } from 'rxjs';

// import { AccountService } from '@app/_services';

// export function appInitializer(accountService: AccountService) {
//     return () => accountService.refreshToken()
//         .pipe(
//             // catch error to start app on success or failure
//             catchError(() => of())
//         );
// }






import { firstValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '@app/_services';

export function appInitializer(accountService: AccountService) {
    return () => 
        firstValueFrom(
            accountService.refreshToken().pipe(
                catchError(() => of(null)) // continue app even if refresh fails
            )
        );
}
