import {State, Action, StateContext, Store} from '@ngxs/store';
import {AddAccountAction, DeleteAccountAction, GetAccountAction, GetAllAccountsAction} from './accounts.actions';
import {Account} from '../../models/account';
import {AccountsService} from '../../services/accounts.service';
import {tap} from 'rxjs/operators';

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

  constructor(private accountsService: AccountsService,
              private store: Store) {
  }

  @Action(AddAccountAction)
  add(ctx: StateContext<AccountsStateModel>, action: AddAccountAction) {
    return this.accountsService.addAccount(action.payload).pipe(tap((result) => {
      this.store.dispatch(new GetAllAccountsAction());
    }));
  }

  @Action(DeleteAccountAction)
  delete(ctx: StateContext<AccountsStateModel>, action: DeleteAccountAction) {
    return this.accountsService.deleteAccount(action.payload).pipe(tap((result) => {
      this.store.dispatch(new GetAllAccountsAction());
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
    if ( idx > 0) {
      state.items.splice(idx, 1);
    }
    return this.accountsService.fetchAccount(action.payload).pipe(tap((result) => {
      ctx.setState({items: [...state.items, result]});
    }));
  }
}
