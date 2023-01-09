import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/core/services/api/api.service';
import { RequestResult } from './models/request_result';
import { RequestPropertyResult } from './models/property/request-property-result';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  
  api: string = this.apiService.base_url;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  getPropertyTypes(): Observable<RequestResult>{
    return this.http.get<RequestResult>(`/v1/new-constructions/property-types`);
  }

  getStates(): Observable<RequestResult> {
    return this.http.get<RequestResult>(`/v1/new-constructions/states`);
  }

  getCities(state: string): Observable<RequestResult> {
    return this.http.get<RequestResult>(`/v1/new-constructions/cities`, {
      params: {
        'state': state,
      },
    });
  }

  getDistricts(city: string, state: string): Observable<RequestResult> {
    return this.http.get<RequestResult>(`/v1/new-constructions/districts`, {
      params: {
        'city' : city,
        'state': state,
      },
    });
  }

  getPropertyDevelopers(): Observable<RequestResult> {
    return this.http.get<RequestResult>(`/v1/new-constructions/property-developers`);
  }

  
  // getPropertiesList(params: any): Observable<RequestPropertyResult>{
  //   return this.http.get<RequestPropertyResult>(`/v1/new-constructions/q`, {
  //     params: params,
  //   });
  // }

  getPropertiesList(params: any): Observable<RequestPropertyResult>{
    return this.http.get<RequestPropertyResult>(`/v1/new-constructions/q?limit=20&offset=0`,)
  }
}

