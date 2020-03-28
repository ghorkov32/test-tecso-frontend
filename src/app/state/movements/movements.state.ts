import {Action, State, StateContext, Store} from '@ngxs/store';
import {AddMovementAction, GetMovementsForAccountAction} from './movements.actions';
import {MovementsService} from '../../services/movements.service';
import {tap} from 'rxjs/operators';
import {Movement} from '../../models/movement';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {NgZone} from '@angular/core';
import {GetAllAccountsAction} from '../accounts/accounts.actions';

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
  snackBarConfig = new MatSnackBarConfig();

  constructor(private movementsService: MovementsService,
              private snackBar: MatSnackBar,
              private store: Store,
              private zone: NgZone) {

    this.snackBarConfig.duration = 3000;
    this.snackBarConfig.horizontalPosition = 'center';
    this.snackBarConfig.verticalPosition = 'bottom';
  }

  @Action(AddMovementAction)
  add(ctx: StateContext<MovementsStateModel>, action: AddMovementAction) {
    const state = ctx.getState();
    return this.movementsService.addMovement(state.accountId, action.payload).pipe(tap((result) => {
      this.zone.run(() => {
        this.snackBar.open('Creado el movimiento a la cuenta corriente #' + state.accountId, 'Descartar', this.snackBarConfig);
      });
      this.store.dispatch(new GetAllAccountsAction());
      this.store.dispatch(new GetMovementsForAccountAction(state.accountId));
    }));
  }

  @Action(GetMovementsForAccountAction)
  fetch(ctx: StateContext<MovementsStateModel>, action: GetMovementsForAccountAction) {
    if (!action.payload) {
      ctx.setState({
        accountId: null,
        items: []
      });
    } else {
      return this.movementsService.fetchMovements(action.payload).pipe(tap((result) => {
        ctx.setState({
          accountId: action.payload,
          items: result
        });
      }));
    }
  }
}
