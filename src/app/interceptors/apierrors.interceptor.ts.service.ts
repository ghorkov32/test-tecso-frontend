import {Injectable, NgZone} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable()
export class ApiErrorsInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar,
              private zone: NgZone) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' || req.method === 'PUT') {
      this.shiftDates(req.body);
    }
    return next.handle(req).pipe(catchError((error: any) => {
      const config = new MatSnackBarConfig();
      config.duration = 3000;
      config.panelClass = ['error-snackbar'];
      config.horizontalPosition = 'center';
      config.verticalPosition = 'bottom';
      this.zone.run(() => {
        this.snackBar.open(error.error.message, 'Descartar', config);
      });
      console.log('triggered interceptor');
      return of(error);
    }));
  }

  shiftDates(body) {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (value instanceof Date) {
        body[key] = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes()
          , value.getSeconds())).toISOString();
      } else if (typeof value === 'object') {
        this.shiftDates(value);
      }
    }
  }
}
