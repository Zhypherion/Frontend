import { Component, OnInit } from '@angular/core';
import { RequestService } from '@app/_services/requests.service';
import { EmployeeService } from '@app/_services/employee.service';
import { AccountService } from '@app/_services';
@Component({
  selector: 'app-requests',
    templateUrl: './requests.component.html', // <-- Change this line
})
export class RequestsComponent implements OnInit {
  requests: any[] = [];
  loading: boolean = false;

  constructor(
    private requestsService: RequestService,
    private employeeService: EmployeeService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.loading = true;
    const currentAccount = this.accountService.accountValue;

// 🔍 DEBUG: Log the current account
    console.log('Current Account:', currentAccount);

    this.requestsService.getMyRequests().subscribe({
      next: (requests) => {

 // 🔍 DEBUG: Log all requests from API
        console.log('All requests from API:', requests);
        console.log('Number of requests:', requests?.length);


// ✅ Filter requests to show only those belonging to the logged-in user
        if (currentAccount?.id) {
          this.requests = (requests || []).filter(request => {
            // 🔍 DEBUG: Log each request's employee info
            console.log('Request:', request.id, 'Employee Account ID:', request.employee?.account?.id, 'Current Account ID:', currentAccount.id);
            return request.employee?.account?.id === currentAccount.id;
          });
          
          // 🔍 DEBUG: Log filtered results
          console.log('Filtered requests for current user:', this.requests);
        } else {
          console.log('⚠️ No current account ID found');
          this.requests = [];
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load requests', err);
        this.requests = [];
        this.loading = false;
      }
    });

  }
}











// import { Component, OnInit } from '@angular/core';
// import { RequestService } from '@app/_services/requests.service';
// import { AccountService } from '@app/_services';
// import { Role } from '@app/_models';

// @Component({
//   selector: 'app-requests',
//   templateUrl: './requests.component.html'
// })
// export class RequestsComponent implements OnInit {
//   requests: any[] = [];
//   loading = false;
//   account: any;

//   constructor(
//     private requestsService: RequestService,
//     private accountService: AccountService
//   ) {
//     this.account = this.accountService.accountValue;
//   }

//   ngOnInit() {
//     this.loadRequests();
//   }

//   loadRequests() {
//     this.loading = true;

//     // 🧩 Employee — show only own requests
//     if (this.account.role === Role.Employee && this.account.employeeId) {
//       this.requestsService.getRequestsByEmployee(this.account.employeeId)
//         .subscribe({
//           next: (data) => { this.requests = data; this.loading = false; },
//           error: (err) => { console.error('Failed to load requests', err); this.loading = false; }
//         });
//     } 
//     // 🧑‍⚖️ Admin — show all
//     else {
//       this.requestsService.getAllRequests()
//         .subscribe({
//           next: (data) => { this.requests = data; this.loading = false; },
//           error: (err) => { console.error('Failed to load requests', err); this.loading = false; }
//         });
//     }
//   }
// }
