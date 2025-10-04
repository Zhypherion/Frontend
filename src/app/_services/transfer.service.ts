// file: _services/transfer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransferService {
  private baseUrl = 'https://api-1-71ag.onrender.com/employees'; // ✅ adjust if needed

  constructor(private http: HttpClient) {}

  transfer(employeeId: string, departmentId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${employeeId}/transfer`, { departmentId });
  }
}
