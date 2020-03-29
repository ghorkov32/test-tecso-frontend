import {Injectable, NgZone} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar,
              private zone: NgZone) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: HttpRequest<any>;
    if (req.method === 'POST' || req.method === 'PUT') {
      request = req.clone({
        headers: req.headers.set('Accept', 'application/json'),
        body: {...this.shiftDates(req.body), hello: 'world'}
      });
    } else {
      request = req;
    }
    return next.handle(request).pipe(map(res => {
        if (req.method === 'GET') {
          return this.shiftDates(res, true);
        }
        return res;
      }),
      catchError((error: any) => {
        const config = new MatSnackBarConfig();
        config.duration = 3000;
        config.panelClass = ['error-snackbar'];
        config.horizontalPosition = 'center';
        config.verticalPosition = 'bottom';
        this.zone.run(() => {
          this.snackBar.open(error.error.message, 'Descartar', config);
        });
        return of(error);
      }));
  }

  shiftDates(body, toLocal?: boolean): any {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (value instanceof Date || key === 'date') {
        if (toLocal) {
          body[key] = new Date(value);
        } else {
          body[key] = value.toISOString();
        }
      } else if (typeof value === 'object') {
        this.shiftDates(value, toLocal);
      }
    }
    return body;
  }
}
