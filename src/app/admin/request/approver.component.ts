import { Component, OnInit } from '@angular/core';
import { RequestService } from '@app/_services/requests.service';
import { AccountService } from '@app/_services';
import { Role } from '@app/_models';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
})
export class ApproverComponent implements OnInit {
  requests: any[] = [];
  loading = false;
  account: any;
  Role = Role;

  constructor(
    private requestsService: RequestService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.account = this.accountService.accountValue;
    this.loadRequests();
  }

  loadRequests() {
    this.loading = true;

    this.requestsService.getAllRequests().subscribe({
      next: (requests) => {
        this.requests = requests;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load requests', err);
        this.loading = false;
      },
    });
  }

  // ✅ Approve request
  approveRequest(id: number) {
    if (!confirm('Are you sure you want to approve this request?')) return;

    this.requestsService.approveRequest(id).subscribe({
      next: () => {
        alert('✅ Request approved successfully');
        this.loadRequests();
      },
      error: (err) => {
        console.error('Error approving request', err);
        alert('❌ Failed to approve request');
      },
    });
  }

  // ❌ Reject request (with optional comment prompt)
  rejectRequest(id: number) {
    const reason = prompt('Enter rejection reason (optional):') || 'No reason given';

    this.requestsService.rejectRequest(id, { reason }).subscribe({
      next: () => {
        alert('🚫 Request rejected');
        this.loadRequests();
      },
      error: (err) => {
        console.error('Error rejecting request', err);
        alert('❌ Failed to reject request');
      },
    });
  }
}
