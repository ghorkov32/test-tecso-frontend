import {Component, Input, OnInit} from '@angular/core';
import {Account} from '../../models/account';
import {Store} from '@ngxs/store';
import {DeleteAccountAction} from '../../state/accounts/accounts.actions';
import {GetMovementsForAccountAction} from '../../state/movements/movements.actions';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @Input()
  account: Account;

  @Input()
  selected: boolean;

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  view() {
    this.store.dispatch(new GetMovementsForAccountAction(this.account.id));
  }

  delete() {
    this.store.dispatch(new DeleteAccountAction(this.account.id));
    this.store.dispatch(new GetMovementsForAccountAction(null));
  }
}
