import {Action, createSelector, Selector, State, StateContext, Store} from '@ngxs/store';
import {AddAccountAction, DeleteAccountAction, GetAccountAction, GetAllAccountsAction} from './accounts.actions';
import {Account} from '../../models/account';
import {AccountsService} from '../../services/accounts.service';
import {tap} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {NgZone} from '@angular/core';

export class AccountsStateModel {
  public items: Account[];
}

@State<AccountsStateModel>({
  name: 'accounts',
  defaults: {
    items: []
  }
})
export class AccountsState {
  snackBarConfig = new MatSnackBarConfig();

  constructor(private accountsService: AccountsService,
              private store: Store,
              private snackBar: MatSnackBar,
              private zone: NgZone) {

    this.snackBarConfig.duration = 3000;
    this.snackBarConfig.horizontalPosition = 'center';
    this.snackBarConfig.verticalPosition = 'bottom';
  }

  @Selector()
  static account(id: number) {
    return createSelector([AccountsState], (state: AccountsStateModel) => {
      return state.items.find(a => a.id === id);
    });

  }

  @Action(AddAccountAction)
  add(ctx: StateContext<AccountsStateModel>, action: AddAccountAction) {
    return this.accountsService.addAccount(action.payload).pipe(tap((result) => {
      this.store.dispatch(new GetAllAccountsAction());
      this.zone.run(() => {
        this.snackBar.open('Cuenta Corriente creada', 'Descartar', this.snackBarConfig);
      });
    }));
  }

  @Action(DeleteAccountAction)
  delete(ctx: StateContext<AccountsStateModel>, action: DeleteAccountAction) {
    return this.accountsService.deleteAccount(action.payload).pipe(tap((result) => {
      this.store.dispatch(new GetAllAccountsAction());
      this.zone.run(() => {
        this.snackBar.open('Cuenta Corriente #' + action.payload + ' eliminada', 'Descartar', this.snackBarConfig);
      });
    }));
  }

  @Action(GetAllAccountsAction)
  fetchAll(ctx: StateContext<AccountsStateModel>, action: GetAllAccountsAction) {
    return this.accountsService.fetchAccounts().pipe(tap((result) => {
      ctx.setState({items: result});
    }));
  }

  @Action(GetAccountAction)
  fetchAccount(ctx: StateContext<AccountsStateModel>, action: GetAccountAction) {
    const state = ctx.getState();
    const idx = state.items.findIndex(i => i.id === action.payload);
    if (idx > 0) {
      state.items.splice(idx, 1);
    }
    return this.accountsService.fetchAccount(action.payload).pipe(tap((result) => {
      ctx.setState({items: [...state.items, result]});
    }));
  }
}
