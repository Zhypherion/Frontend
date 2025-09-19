import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';//<<<
import { environment } from '@environments/environment';
import { Employee } from '@app/_models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = `${environment.apiUrl}/employees`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getById(id: string) {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  create(params: any) {
    return this.http.post(this.baseUrl, params);
  }

  update(id: string, params: any) {
    return this.http.put(`${this.baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
