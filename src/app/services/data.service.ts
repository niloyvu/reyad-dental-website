import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpClient = inject(HttpClient);
  apiUrl = environment.API_URL;

  getData(path: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${path}`);
  }

}


