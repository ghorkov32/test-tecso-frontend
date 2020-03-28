import {Component, OnInit} from '@angular/core';
import {PaymentType} from '../../enum/paymentType';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {AddAccountAction} from '../../state/accounts/accounts.actions';
import {GetMovementsForAccountAction} from '../../state/movements/movements.actions';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  public paymentTypes = Object.keys(PaymentType).map(v => v.toString());
  accountForm: FormGroup;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.accountForm = new FormGroup({
      currency: new FormControl(null, [Validators.required]),
      balance: new FormControl(0, [Validators.required])
    });
  }

  createAccount() {
    this.store.dispatch(new AddAccountAction(this.accountForm.value));
    this.store.dispatch(new GetMovementsForAccountAction(null));
    this.accountForm.reset();
  }
}
