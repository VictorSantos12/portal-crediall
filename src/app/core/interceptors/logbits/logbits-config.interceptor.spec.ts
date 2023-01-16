import { TestBed } from '@angular/core/testing';

import { LogbitsConfigInterceptor } from './logbits-config.interceptor';

describe('HttpConfigInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [LogbitsConfigInterceptor]
  }));
  it('should create an instance', () => {
    const interceptor: LogbitsConfigInterceptor = TestBed.inject(LogbitsConfigInterceptor);
    expect(interceptor).toBeTruthy(); 
   });
});
