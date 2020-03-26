import {Movement} from '../../models/movement';

export class GetMovementsForAccountAction {
  static readonly type = '[Movements] Get';
  constructor(public payload: number) { }
}
export class AddMovementAction {
  static readonly type = '[Accounts] Add';
  constructor(public accountId: number, public payload: Movement) { }
}
