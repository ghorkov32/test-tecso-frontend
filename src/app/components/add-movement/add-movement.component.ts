import {Component, Inject, OnInit} from '@angular/core';
import {Movement} from '../../models/movement';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {Account} from '../../models/account';
import {concatMap, map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-movement',
  templateUrl: './add-movement.component.html',
  styleUrls: ['./add-movement.component.css']
})
export class AddMovementComponent implements OnInit {
  movementForm: FormGroup;
  id: number = null;
  account$: Observable<Account>;

  constructor(public dialogRef: MatDialogRef<AddMovementComponent>,
              private store: Store,
              @Inject(MAT_DIALOG_DATA) public data: Movement) {

  }

  ngOnInit() {
    this.movementForm = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      date: new FormControl(new Date(), Validators.required)
    });
    this.movementForm.valueChanges.subscribe(res => {
      this.data = res;
    });
    this.account$ = this.store.select(state => state.movements.accountId)
      .pipe(concatMap(accountId => this.store.select(s => s.accounts.items)
        .pipe(map((res: Account[]) => {
          console.log(res);
          return res.find(r => r.id === accountId);
        })))
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
