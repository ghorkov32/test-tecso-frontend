import {Action, State, StateContext, Store} from '@ngxs/store';
import {AddMovementAction, GetMovementsForAccountAction} from './movements.actions';
import {MovementsService} from '../../services/movements.service';
import {tap} from 'rxjs/operators';
import {Movement} from '../../models/movement';
import {MatSnackBar} from '@angular/material';
import {NgZone} from '@angular/core';

export class MovementsStateModel {
  public accountId: number;
  public items: Movement[];
}

@State<MovementsStateModel>({
  name: 'movements',
  defaults: {
    accountId: null,
    items: []
  }
})
export class MovementsState {
  constructor(private movementsService: MovementsService,
              private snackBar: MatSnackBar,
              private store: Store,
              private zone: NgZone) {
  }

  @Action(AddMovementAction)
  add(ctx: StateContext<MovementsStateModel>, action: AddMovementAction) {
    return this.movementsService.addMovement(action.accountId, action.payload).pipe(tap((result) => {
      this.zone.run(() => {
        this.snackBar.open('Creado el movimiento a la cuenta corriente #' + action.accountId);
      });
      this.store.dispatch(new GetMovementsForAccountAction(action.accountId));
    }));
  }

  @Action(GetMovementsForAccountAction)
  fetch(ctx: StateContext<MovementsStateModel>, action: GetMovementsForAccountAction) {
    return this.movementsService.fetchMovements(action.payload).pipe(tap((result) => {
      ctx.setState({
        accountId: action.payload,
        items: result
      });
    }));
  }
}
