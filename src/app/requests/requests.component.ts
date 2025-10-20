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
