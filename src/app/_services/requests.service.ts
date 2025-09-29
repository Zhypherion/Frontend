import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class RequestService {
  constructor(private http: HttpClient) {}

  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/requests`);
  }

  getRequestById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/requests/${id}`);
  }

  createRequest(request: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/requests`, request);
  }

  updateRequest(id: number, request: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/requests/${id}`, request);
  }

  getActiveEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/requests/helpers/active-employees`);
  }

  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/requests/helpers/all-employees`);
  }

  getRequestTypes(): Observable<string[]> {
  return this.http.get<string[]>(`${environment.apiUrl}/requests/types`);
}

}
