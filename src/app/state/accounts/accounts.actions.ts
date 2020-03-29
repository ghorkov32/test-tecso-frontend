import {Account} from '../../models/account';

export class AddAccountAction {
  static readonly type = '[Accounts] Add';
  constructor(public payload: Account) { }
}
export class DeleteAccountAction {
  static readonly type = '[Accounts] Delete';
  constructor(public payload: number) { }
}
export class GetAllAccountsAction {
  static readonly type = '[Accounts] Get all';
  constructor() { }
}
export class GetAccountAction {
  static readonly type = '[Accounts] Get';
  constructor(public payload: number) { }
}
