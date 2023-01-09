import { TestBed } from '@angular/core/testing';
import { HttpConfigInterceptor } from './http-config.interceptor';

describe('HttpConfigInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpConfigInterceptor
      ]
  }));
  it('should create an instance', () => {
    const interceptor: HttpConfigInterceptor = TestBed.inject(HttpConfigInterceptor);
    expect(interceptor).toBeTruthy(); 
   });
});
