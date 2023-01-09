import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  base_url: string = 'https://api-test.homer.com.br';

  constructor() { }
}
