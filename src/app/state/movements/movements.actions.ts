import {Movement} from '../../models/movement';

export class GetMovementsForAccountAction {
  static readonly type = '[Accounts] Add item';
  constructor(public payload: number) { }
}
export class AddMovementAction {
  static readonly type = '[Accounts] Add item';
  constructor(public accountId: number, public payload: Movement) { }
}
