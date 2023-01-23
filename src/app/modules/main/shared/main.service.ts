import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/core/services/api/api.service';
import { RequestResult } from './models/request_result';
import { RequestPropertyResult } from './models/property/request-property-result';
import { SimulatorResult } from './models/simulator/simulator-result';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  
  api: string = this.apiService.base_url;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  getPropertyTypes(): Observable<RequestResult>{
    return this.http.get<RequestResult>(`https://api-test.homer.com.br/v1/new-constructions/property-types`);
  }

  getStates(): Observable<RequestResult> {
    return this.http.get<RequestResult>(`https://api-test.homer.com.br/v1/new-constructions/states`);
  }

  getCities(state: string): Observable<RequestResult> {
    return this.http.get<RequestResult>(`https://api-test.homer.com.br/v1/new-constructions/cities`, {
      params: {
        'state': state,
      },
    });
  }

  getDistricts(city: string, state: string): Observable<RequestResult> {
    return this.http.get<RequestResult>(`https://api-test.homer.com.br/v1/new-constructions/districts`, {
      params: {
        'city' : city,
        'state': state,
      },
    });
  }

  getPropertyDevelopers(): Observable<RequestResult> {
    return this.http.get<RequestResult>(`https://api-test.homer.com.br/v1/new-constructions/property-developers`);
  }

  
  getPropertiesList(params: any): Observable<RequestPropertyResult>{
    return this.http.get<RequestPropertyResult>(`https://api-test.homer.com.br/v1/new-constructions/q?`, {
      params: params,
    });
  }

  // https://api-test.homer.com.br/v1/

  simulateInvestment(dados: any): Observable<SimulatorResult> {
    return this.http.post<SimulatorResult>(
      `https://api.desenv.app.logbits.com.br/simulador/SimuladorFinanciamento/v1`, dados
    );
  }

}

