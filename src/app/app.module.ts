import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {AccountsState} from './state/accounts/accounts.state';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AccountComponent} from './components/account/account.component';
import {AccountsListComponent} from './components/accounts-list/accounts-list.component';
import {MovementsListComponent} from './components/movements-list/movements-list.component';
import {AccountsDashboardComponent} from './pages/accounts-dashboard/accounts-dashboard.component';
import {AddMovementComponent} from './components/add-movement/add-movement.component';
import {AddAccountComponent} from './components/add-account/add-account.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiErrorsInterceptor} from './interceptors/apierrors.interceptor.ts.service';
import {MovementsState} from './state/movements/movements.state';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AccountsListComponent,
    MovementsListComponent,
    AccountsDashboardComponent,
    AddMovementComponent,
    AddAccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AccountsState, MovementsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    MatTableModule
  ],
  providers: [HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS, useClass: ApiErrorsInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddMovementComponent
  ]
})
export class AppModule {
}
