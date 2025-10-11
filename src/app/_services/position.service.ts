import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PositionService {
  private baseUrl = 'https://api-1-71ag.onrender.com/positions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(position: any): Observable<any> {
    return this.http.post(this.baseUrl, position);
  }

  update(id: number, position: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, position);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
