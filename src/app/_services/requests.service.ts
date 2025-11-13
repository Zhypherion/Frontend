// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '@environments/environment';

// @Injectable({ providedIn: 'root' })
// export class RequestService {
//   constructor(private http: HttpClient) {}

//   getAllRequests(): Observable<any[]> {
//     return this.http.get<any[]>(`${environment.apiUrl}/requests`);
//   }

//   getRequestById(id: number): Observable<any> {
//     return this.http.get<any>(`${environment.apiUrl}/requests/${id}`);
//   }

//   createRequest(request: any): Observable<any> {
//     return this.http.post(`${environment.apiUrl}/requests`, request);
//   }

//   updateRequest(id: number, request: any): Observable<any> {
//     return this.http.put(`${environment.apiUrl}/requests/${id}`, request);
//   }

//   getActiveEmployees(): Observable<any[]> {
//     return this.http.get<any[]>(`${environment.apiUrl}/requests/helpers/active-employees`);
//   }

//   getAllEmployees(): Observable<any[]> {
//     return this.http.get<any[]>(`${environment.apiUrl}/requests/helpers/all-employees`);
//   }

//   getRequestTypes(): Observable<string[]> {
//   return this.http.get<string[]>(`${environment.apiUrl}/requests/types`);
// }

// }






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

  // ✅ NEW: Approve request
  approveRequest(id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/requests/${id}/approve`, {});
  }

  // ✅ NEW: Reject request (optional reason)
  rejectRequest(id: number, body: any = {}): Observable<any> {
    return this.http.put(`${environment.apiUrl}/requests/${id}/reject`, body);
  }
  
  getMyRequests(): Observable<any[]> {
  return this.http.get<any[]>(`${environment.apiUrl}/requests/my`);
}

}









// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '@environments/environment';

// const baseUrl = `${environment.apiUrl}/requests`;

// @Injectable({ providedIn: 'root' })
// export class RequestService {
//   constructor(private http: HttpClient) {}

//   // 🔹 Admin - get all requests
//   getAllRequests(): Observable<any[]> {
//     return this.http.get<any[]>(baseUrl);
//   }

//   // 🔹 Employee - get requests for a specific employee
//   getRequestsByEmployee(employeeId: number): Observable<any[]> {
//     return this.http.get<any[]>(`${baseUrl}?employeeId=${employeeId}`);
//   }

//   // 🔹 Get single request by ID
//   getRequestById(id: number): Observable<any> {
//     return this.http.get<any>(`${baseUrl}/${id}`);
//   }

//   // 🔹 Create new request
//   createRequest(request: any): Observable<any> {
//     return this.http.post(baseUrl, request);
//   }

//   // 🔹 Update existing request
//   updateRequest(id: number, request: any): Observable<any> {
//     return this.http.put(`${baseUrl}/${id}`, request);
//   }

//   // 🔹 Get only active employees (for dropdowns)
//   getActiveEmployees(): Observable<any[]> {
//     return this.http.get<any[]>(`${baseUrl}/helpers/active-employees`);
//   }

//   // 🔹 Get all employees (active + inactive)
//   getAllEmployees(): Observable<any[]> {
//     return this.http.get<any[]>(`${baseUrl}/helpers/all-employees`);
//   }

//   // 🔹 Get request types
//   getRequestTypes(): Observable<string[]> {
//     return this.http.get<string[]>(`${baseUrl}/types`);
//   }
// }
