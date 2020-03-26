import { Component, OnInit } from '@angular/core';
import {PaymentType} from '../../enum/paymentType';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  public paymentTypes = Object.keys(PaymentType).map(v => v.toString());

  constructor() { }

  ngOnInit() {
  }

}
