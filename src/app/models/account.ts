import {PaymentType} from '../enum/paymentType';

export interface Account {
  id?: number;
  balance: number;
  currency: PaymentType;
}
