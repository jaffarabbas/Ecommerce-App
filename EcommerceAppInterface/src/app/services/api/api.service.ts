import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  apiUrl!: string;
  apiController!: string;

  private _refreshApi = new Subject<void>();

  get refreshApi() {
    return this._refreshApi;
  }

  get apiUrlWithController(): string {
    return this.apiUrl + this.apiController + "/";
  }

  constructor(private http: HttpClient) {}

  private createRequestOptions(token?: string): { headers: HttpHeaders } {
    let headers = new HttpHeaders();
    if (token) {
      console.log('token: ', token)
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }

  getAll(endPoint: string, token?: string): Observable<T[]> {
    const requestOptions = this.createRequestOptions(token);
    return this.http.get<T[]>(this.apiUrlWithController + endPoint, requestOptions);
  }

  getOne(endPoint: string, token?: string): Observable<T> {
    const requestOptions = this.createRequestOptions(token);
    return this.http.get<T>(this.apiUrlWithController + endPoint, requestOptions);
  }

  getAllById(id: any, endPoint: string, token?: string): Observable<T[]> {
    const requestOptions = this.createRequestOptions(token);
    return this.http.get<T[]>(`${this.apiUrlWithController + endPoint}/${id}`, requestOptions);
  }

  getById(id: any, endPoint: string, token?: string): Observable<T> {
    const requestOptions = this.createRequestOptions(token);
    return this.http.get<T>(`${this.apiUrlWithController + endPoint}/${id}`, requestOptions);
  }

  create(item: T, endPoint: string, token?: string): Observable<T> {
    const requestOptions = this.createRequestOptions(token);
    return this.http.post<T>(this.apiUrlWithController + endPoint, item, requestOptions).pipe(
      tap(() => {
        this.refreshApi.next();
      })
    );
  }

  update(value: T, id: any, endPoint: string, token?: string): Observable<T> {
    const requestOptions = this.createRequestOptions(token);
    return this.http.put<T>(`${this.apiUrlWithController + endPoint}/${id}`, value, requestOptions).pipe(
      tap(() => {
        this.refreshApi.next();
      })
    );
  }

  updateByData(value: T, endPoint: string, token?: string): Observable<T> {
    const requestOptions = this.createRequestOptions(token);
    return this.http.put<T>(this.apiUrlWithController + endPoint, value, requestOptions).pipe(
      tap(() => {
        this.refreshApi.next();
      })
    );
  }

  remove(value: T, id: any, endPoint: string, token?: string): Observable<T> {
    const requestOptions = this.createRequestOptions(token);
    return this.http.put<T>(`${this.apiUrlWithController + endPoint}/${id}`, value, requestOptions);
  }
  
  delete(id: number, endPoint: string, token?: string): Observable<any> {
    const requestOptions = this.createRequestOptions(token);
    return this.http.delete(`${this.apiUrlWithController + endPoint}/${id}`, requestOptions).pipe(
      tap(() => {
        this.refreshApi.next();
      })
    );
  }
}
