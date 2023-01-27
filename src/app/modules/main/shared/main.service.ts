import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/core/services/api/api.service';
import { RequestResult } from './models/request_result';
import { RequestPropertyResult } from './models/property/request-property-result';
import { SimulatorResult } from './models/simulator/simulator-result';
import { PropertyData } from './models/contact/property-data';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  
  url: string = this.apiService.base_url;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  getPropertyTypes(): Observable<RequestResult>{
    return this.http.get<RequestResult>(`${this.url}/v1/new-constructions/property-types`);
  }

  getStates(): Observable<RequestResult> {
    return this.http.get<RequestResult>(`${this.url}/v1/new-constructions/states`);
  }

  getCities(state: string): Observable<RequestResult> {
    return this.http.get<RequestResult>(`${this.url}/v1/new-constructions/cities`, {
      params: {
        'state': state,
      },
    });
  }

  getDistricts(city: string, state: string): Observable<RequestResult> {
    return this.http.get<RequestResult>(`${this.url}/v1/new-constructions/districts`, {
      params: {
        'city' : city,
        'state': state,
      },
    });
  }

  getPropertyDevelopers(): Observable<RequestResult> {
    return this.http.get<RequestResult>(`${this.url}/v1/new-constructions/property-developers`);
  }

  getPropertiesList(params: any): Observable<RequestPropertyResult>{
    return this.http.get<RequestPropertyResult>(`${this.url}/v1/new-constructions/q?`, {
      params: params,
    });
  }
  
  setPropertyData(property: PropertyData, lead: string) : Observable<any>{
    return this.http.post<any>(`https://api.desenv.app.logbits.com.br/simulador/dadosimovel/v1`, property, {
      headers: {
        'crediall_lead': lead,
      }
    });
  }

  simulateInvestment(dados: any, lead: string): Observable<SimulatorResult> {
    return this.http.post<SimulatorResult>(
      `https://api.desenv.app.logbits.com.br/simulador/SimuladorFinanciamento/v1`, dados, {
        headers: {
          'crediall_lead': lead,
        }
      }
    );
  }

}

