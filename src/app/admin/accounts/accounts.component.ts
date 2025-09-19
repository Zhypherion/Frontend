import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  //styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: any[] | null = null;
  loading = true; 

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.loading = true;
    this.accountService.getAll()
      .pipe(first())
      .subscribe({
        next: (accounts) => {
      // loop through each account and add status + isDeleting
      this.accounts = accounts.map((account: any) => ({
        ...account,
        status: account.status ?? 'Active',   // ✅ default status
        isDeleting: false                     // ✅ track deleting
      }));
      this.loading = false;
    },
    error: (err) => {
      console.error('Error fetching accounts', err);
      this.loading = false;
    }
      });
  }

  onAddAccount(): void {
    // Navigate to add form
    console.log('Add Account button clicked');
  }

  onEditAccount(account: any): void {
    // Navigate to edit form with account ID
    console.log('Edit Account button clicked for:', account);
  }

  onDeleteAccount(id: string): void {
    if (!confirm('Are you sure you want to delete this account?')) {
      return;
    }

    // Find the account and set its isDeleting state
    const accountToDelete = this.accounts?.find(x => x.id === id);
    if (!accountToDelete) return;

    accountToDelete.isDeleting = true;

    this.accountService.delete(id)
      .pipe(first())
      .subscribe({
        next: () => {
          // Filter the deleted account from the list
          this.accounts = this.accounts?.filter(x => x.id !== id) ?? [];
        },
        error: (err) => {
          console.error('Error deleting account', err);
          accountToDelete.isDeleting = false;
        }
      });
  }
}