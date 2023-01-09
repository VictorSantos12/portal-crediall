import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (!/^(http|https):/i.test(req.url)) {
        req = req.clone({ url: environment.api_url + req.url });
      }

      return next.handle(req).pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((err: HttpErrorResponse) => {
          Swal.fire({
            title: 'ERROR',
            icon: 'warning',
            text: 'Não foi possível realizar a ação.',
            confirmButtonText: 'ok',
            confirmButtonColor: '#012942',
            showCloseButton: true,
          });
           return throwError(err);
        }),
      );
    }

  
}
