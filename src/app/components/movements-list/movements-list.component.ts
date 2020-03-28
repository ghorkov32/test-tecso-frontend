import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Movement} from '../../models/movement';
import {Select, Store} from '@ngxs/store';
import {MatDialog} from '@angular/material';
import {AddMovementComponent} from '../add-movement/add-movement.component';
import {AddMovementAction, GetMovementsForAccountAction} from '../../state/movements/movements.actions';

@Component({
  selector: 'app-movements-list',
  templateUrl: './movements-list.component.html',
  styleUrls: ['./movements-list.component.css']
})
export class MovementsListComponent implements OnInit {
  @Select(state => state.movements.items) movements$: Observable<Movement[]>;
  @Select(state => state.movements.accountId) selectedAccountId$: BehaviorSubject<number>;
  displayedColumns: string[] = ['date', 'description', 'amount'];

  constructor(public dialog: MatDialog, private store: Store) {
  }

  ngOnInit() {

  }

  add() {
    const dialogRef = this.dialog.open(AddMovementComponent, {
      width: '250px',
      data: {
        amount: 0,
        description: '',
        date: new Date()
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(new AddMovementAction(result));
    });
  }

  close() {
    this.store.dispatch(new GetMovementsForAccountAction(null));
  }
}
