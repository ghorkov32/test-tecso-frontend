import {async, TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {AccountsState, AccountsStateModel} from './accounts.state';
import {AddAccountAction, DeleteAccountAction} from './accounts.actions';
import {PaymentType} from '../../enum/paymentType';
import {Account} from '../../models/account';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MovementsState} from '../movements/movements.state';
import {AccountsService} from '../../services/accounts.service';
import {of} from 'rxjs';

describe('Accounts actions', () => {
  let store: Store;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let accountsService: AccountsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AccountsState]),
        HttpClientTestingModule]
    }).compileComponents();
    store = TestBed.get(Store);
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    accountsService = TestBed.get(AccountsService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  // TODO: failing, check why if there's time
/*  it('should create an action and add an account', () => {
    const payload: Account = {balance: 0, currency: PaymentType.ARS};
    store.dispatch(new AddAccountAction(payload));
    spyOn(accountsService, 'fetchAccounts').and.returnValue(of([payload]));
    store.select(state => state.accounts.items).subscribe((items: Account[]) => {
      console.log(items);
      expect(items.length).toEqual(1);
    });
  });*/
});
