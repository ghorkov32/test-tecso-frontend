import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Account} from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) {
  }

  fetchAccounts() {
    return this.http.get<Account[]>(environment.apiUrl + '/accounts/list');
  }

  deleteAccount(id: number) {
    return this.http.delete(environment.apiUrl + '/accounts/' + id);
  }

  addAccount(payload: Account) {
    return this.http.put<Account>(environment.apiUrl + '/accounts', payload);
  }

  fetchAccount(id: number) {
    return this.http.get<Account>(environment.apiUrl + '/accounts/' + id);
  }
}
