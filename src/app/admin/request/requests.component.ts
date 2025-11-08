import { Component, OnInit } from '@angular/core';
import { RequestService } from '@app/_services/requests.service';
import { AccountService } from '@app/_services/account.service';
import { EmployeeService } from '@app/_services/employee.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
})
export class RequestsComponent implements OnInit {
  requests: any[] = [];
  loading: boolean = false;
  currentUser: any;
  currentEmployee: any;
  isAdminOrManager: boolean = false;

  constructor(
    private requestsService: RequestService,
    private accountService: AccountService,
    private employeeService: EmployeeService
  ) {
    this.currentUser = this.accountService.accountValue;
  }

  ngOnInit() {
    this.loadCurrentEmployee();
  }

  loadCurrentEmployee() {
    this.loading = true;
    // Get current employee data to check position
    this.employeeService.getAll().subscribe({
      next: (employees) => {
        this.currentEmployee = employees.find(
          emp => emp.accountId === this.currentUser.id
        );
        
        if (this.currentEmployee?.position) {
          const hierarchyLevel = this.currentEmployee.position.hierarchyLevel;
          this.isAdminOrManager = 
            this.currentUser.role === 'Admin' || 
            hierarchyLevel === 'Manager' || 
            hierarchyLevel === 'Supervisor';
        } else {
          this.isAdminOrManager = this.currentUser.role === 'Admin';
        }
        
        this.loadRequests();
      },
      error: (err) => {
        console.error('Failed to load employee data', err);
        this.loading = false;
      }
    });
  }

  loadRequests() {
    this.loading = true;
    this.requestsService.getAllRequests().subscribe({
      next: (requests) => {
        // Filter requests based on role
        if (this.isAdminOrManager) {
          // Admin and Managers see all requests
          this.requests = requests;
        } else {
          // Regular employees see only their own requests
          this.requests = requests.filter(
            req => req.employeeId === this.currentEmployee?.id
          );
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load requests', err);
        this.loading = false;
      }
    });
  }

  approveRequest(requestId: number) {
    if (!this.isAdminOrManager) return;
    
    this.requestsService.updateRequest(requestId, { status: 'Approved' })
      .subscribe({
        next: () => {
          this.loadRequests();
        },
        error: (err) => {
          console.error('Failed to approve request', err);
        }
      });
  }

  rejectRequest(requestId: number) {
    if (!this.isAdminOrManager) return;
    
    this.requestsService.updateRequest(requestId, { status: 'Rejected' })
      .subscribe({
        next: () => {
          this.loadRequests();
        },
        error: (err) => {
          console.error('Failed to reject request', err);
        }
      });
  }
}