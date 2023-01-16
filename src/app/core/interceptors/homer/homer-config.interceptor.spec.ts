import { TestBed } from '@angular/core/testing';

import { HomerConfigInterceptor } from './homer-config.interceptor';

describe('HttpConfigInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HomerConfigInterceptor
    ]
  }));
  it('should create an instance', () => {
    const interceptor: HomerConfigInterceptor = TestBed.inject(HomerConfigInterceptor);
    expect(interceptor).toBeTruthy(); 
   });
});
