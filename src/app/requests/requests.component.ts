import { Component, OnInit } from '@angular/core';
import { RequestService } from '@app/_services/requests.service';
import { EmployeeService } from '@app/_services/employee.service';

@Component({
  selector: 'app-requests',
    templateUrl: './requests.component.html', // <-- Change this line
})
export class RequestsComponent implements OnInit {
  requests: any[] = [];
  loading: boolean = false;

  constructor(
    private requestsService: RequestService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.loading = true;
    this.requestsService.getAllRequests()
      .subscribe({
        next: (requests) => {
          this.requests = requests;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load requests', err);
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
