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

  headerSection(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/navbar-section`);
  }

  heroSection(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/hero-section`);
  }

  heroFormText(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/hero-form-text`);
  }

  homeFeatures(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/feature-cards`);
  }

  whoWeAre(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/who-we-are`);
  }

  dentalServices(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/service-section`);
  }

  whyChooseUsSection(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/why-choose-us`);
  }

  appointmentSection(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/appointment-section`);
  }

}


