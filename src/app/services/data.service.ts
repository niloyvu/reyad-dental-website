import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  http = inject(HttpClient);
  apiUrl = environment.API_URL;

  getData(path: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${path}`);
  }

  getDataById(path: string, id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${path}?id=${id}`);
  }

  getDataByQueryParams(path: string, params: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${path}${params}`);
  }

  postData(formValue: any, path: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${path}`, formValue);
  }

}


