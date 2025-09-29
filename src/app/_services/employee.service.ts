// file: _services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '@app/_models/employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private baseUrl = 'http://localhost:4000/employees'; // backend base URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getById(id: number | string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(employee: Employee): Observable<any> {
    return this.http.post(this.baseUrl, employee);
  }

  update(id: number | string, params: any) {
    return this.http.put(`${this.baseUrl}/${id}`, params);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Get next auto-generated employee ID
  getNextId(): Observable<{ nextId: string }> {
    return this.http.get<{ nextId: string }>(`${this.baseUrl}/next-id`);
  }

  /** 🔹 Transfer employee to another department */
  transferEmployee(employeeId: string, departmentId: string): Observable<any> {
    // ✅ fixed endpoint and verb
    return this.http.post(`${this.baseUrl}/${employeeId}/transfer`, { departmentId });
  }

}
