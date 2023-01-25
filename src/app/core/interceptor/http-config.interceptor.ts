import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        Swal.fire({
          title: `${err.error.title}` != null ? `${err.error.title}` : 'ERROR',
          icon: 'warning',
          text: `${err.error.detail}` != null ? `${err.error.detail}` : 'Não foi possível realizar a ação',
          confirmButtonText: 'ok',
          confirmButtonColor: '#012942',
          showCloseButton: true,
        });
         return throwError(err);
      }),
    );
  }

}
