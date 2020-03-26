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
    return next.handle(req).pipe(catchError((error: any) => {
      const config = new MatSnackBarConfig();
      config.duration = 5000;
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
}
