import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';
import {AccountsState} from './state/accounts/accounts.state';
import {HttpClientModule} from '@angular/common/http';
import { AccountComponent } from './components/account/account.component';
import { MovementComponent } from './components/movement/movement.component';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';
import { MovementsListComponent } from './components/movements-list/movements-list.component';
import { AccountsDashboardComponent } from './pages/accounts-dashboard/accounts-dashboard.component';
import { AddMovementComponent } from './components/add-movement/add-movement.component';
import { AddAccountComponent } from './components/add-account/add-account.component';
import {MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    MovementComponent,
    AccountsListComponent,
    MovementsListComponent,
    AccountsDashboardComponent,
    AddMovementComponent,
    AddAccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AccountsState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
