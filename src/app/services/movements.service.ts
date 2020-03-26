import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Movement} from '../models/movement';

@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  constructor(private http: HttpClient) {
  }

  fetchMovements(accountId: number) {
    return this.http.get<Movement[]>(environment.apiUrl + '/accounts/' + accountId + '/movements');
  }

  addMovement(accountId: number, payload: Movement) {
    return this.http.put<Movement>(environment.apiUrl + '/accounts/' + accountId + '/movement', payload);
  }
}
