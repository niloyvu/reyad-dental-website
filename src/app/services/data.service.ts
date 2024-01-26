import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpClient = inject(HttpClient);
  apiUrl = environment.API_URL;

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getData(path: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${path}`);
  }

  getDataById(path: string, id: string): Observable<any> {

    return this.httpClient.get(`${this.apiUrl}/${path}?id=${id}`);
  }

}


