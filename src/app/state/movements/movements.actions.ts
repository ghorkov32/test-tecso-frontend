import {Movement} from '../../models/movement';

export class GetMovementsForAccountAction {
  static readonly type = '[Movements] Get';

  constructor(public payload: number) {
  }
}

export class AddMovementAction {
  static readonly type = '[Movements] Add';

  constructor(public payload: Movement) {
  }
}

export class SetSelectedAccount {
  static readonly type = '[Movements] Set Account';

  constructor(public payload: number) {
  }
}
