import {State, Action, StateContext} from '@ngxs/store';
import {AddMovementAction, GetMovementsForAccountAction} from './movements.actions';
import {MovementsService} from '../../services/movements.service';
import {tap} from 'rxjs/operators';
import {Movement} from '../../models/movement';

export class MovementsStateModel {
  public items: Movement[];
}

@State<MovementsStateModel>({
  name: 'movements',
  defaults: {
    items: []
  }
})
export class MovementsState {
  constructor(private movementsService: MovementsService) {
  }

  @Action(AddMovementAction)
  add(ctx: StateContext<MovementsStateModel>, action: AddMovementAction) {
    return this.movementsService.addMovement(action.accountId, action.payload).pipe(tap((result) => {
      const state = ctx.getState();
      ctx.setState({items: [...state.items, action.payload]});
    }));
  }

  @Action(GetMovementsForAccountAction)
  fetch(ctx: StateContext<MovementsStateModel>, action: GetMovementsForAccountAction) {
    return this.movementsService.fetchMovements(action.payload).pipe(tap((result) => {
      ctx.setState({items: result});
    }));
  }
}
