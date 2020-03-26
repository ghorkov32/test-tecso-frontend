import {Account} from '../../models/account';

export class AddAccountAction {
  static readonly type = '[Accounts] Add item';
  constructor(public payload: Account) { }
}
export class DeleteAccountAction {
  static readonly type = '[Accounts] Add item';
  constructor(public payload: number) { }
}
export class GetAllAccountsAction {
  static readonly type = '[Accounts] Add item';
  constructor() { }
}
export class GetAccountAction {
  static readonly type = '[Accounts] Add item';
  constructor(public payload: number) { }
}
