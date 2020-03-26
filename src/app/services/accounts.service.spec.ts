import {async, TestBed} from '@angular/core/testing';

import {AccountsService} from './accounts.service';
import {PaymentType} from '../enum/paymentType';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

describe('AccountsService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: AccountsService = TestBed.get(AccountsService);
    expect(service).toBeTruthy();
  });
  it ('should get all accounts', async(() => {
    const service: AccountsService = TestBed.get(AccountsService);
    service.fetchAccounts().subscribe(
      (response) => expect(response).not.toBeNull(),
      (error) => fail(error)
    );
  }));
  it ('should get an account', async(() => {
    const service: AccountsService = TestBed.get(AccountsService);
    service.fetchAccount(1).subscribe(
      (response) => expect(response).not.toBeNull(),
      (error) => fail(error)
    );
  }));
  it ('should create an account', async(() => {
    const service: AccountsService = TestBed.get(AccountsService);
    service.addAccount({currency: PaymentType.ARS, balance: 0}).subscribe(
      (response) => expect(response).not.toBeNull(),
      (error) => fail(error)
    );
  }));
  it ('should delete an account', async(() => {
    const service: AccountsService = TestBed.get(AccountsService);
    service.deleteAccount(1).subscribe(
      (response) => expect(response).not.toBeNull(),
      (error) => fail(error)
    );
  }));
});
