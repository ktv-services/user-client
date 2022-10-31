import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PermissionCreateDto } from '../../../models/cabinet/users/dtos/permission/permission-create-dto';

@Injectable({
  providedIn: 'root'
})

export class PermissionService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/permissions/';
  }

  public getPermissions(active = false): Observable<any> {
    const activeQuery = active ? `?active=${active}` : '';
    return this.http.get(`${this.baseUrl}${activeQuery}`)
      .pipe(catchError(this.error));
  }

  public getPermissionById(id: string): Observable<any> {
    return this.http.get(this.baseUrl + id)
      .pipe(catchError(this.error));
  }

  public createPermission(permission: PermissionCreateDto): Observable<any> {
    return this.http.post(this.baseUrl, permission)
      .pipe(catchError(this.error));
  }

  public editPermission(id: string, permission: PermissionCreateDto): Observable<any> {
    return this.http.put(this.baseUrl + id, permission)
      .pipe(catchError(this.error));
  }

  public removePermission(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + id)
      .pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse): Observable<any> {
    return new Observable<any>(observer => {
      observer.next(error.error);
    });
  }

}
