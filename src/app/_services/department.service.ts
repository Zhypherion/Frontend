import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Department } from '@app/_models/department';
import { Employee } from '@app/_models/employee';


@Injectable({ providedIn: 'root' })
export class DepartmentService {
  private baseUrl = `${environment.apiUrl}/departments`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Department[]>(this.baseUrl);
  }

  getById(id: string) {
    return this.http.get<Department>(`${this.baseUrl}/${id}`);
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
