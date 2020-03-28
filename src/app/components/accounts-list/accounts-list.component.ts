import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Account} from '../../models/account';
import {GetAllAccountsAction} from '../../state/accounts/accounts.actions';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent implements OnInit {

  @Select(state => state.accounts.items) accounts$: Observable<Account[]>;
  @Select(state => state.movements.accountId) selectedAccountId$: Observable<number>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new GetAllAccountsAction());
  }

}
