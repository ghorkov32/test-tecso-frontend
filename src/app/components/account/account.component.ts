import {Component, Input, OnInit} from '@angular/core';
import {Account} from '../../models/account';
import {Store} from '@ngxs/store';
import {DeleteAccountAction} from '../../state/accounts/accounts.actions';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @Input()
  account: Account;

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  view() {

  }

  delete() {
    this.store.dispatch(new DeleteAccountAction(this.account.id));
  }
}
