import {async, TestBed} from '@angular/core/testing';
import {NgxsModule, Store} from '@ngxs/store';
import {MovementsState} from './movements.state';
import {AddMovementAction} from './movements.actions';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {Movement} from '../../models/movement';
import {of} from 'rxjs';
import {MovementsService} from '../../services/movements.service';

describe('Movements actions', () => {
  let store: Store;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let movementsService: MovementsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([MovementsState]),
        HttpClientTestingModule]
    }).compileComponents();
    store = TestBed.get(Store);
    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    movementsService = TestBed.get(MovementsService);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  it('should create an action and add an item', () => {
    const payload: Movement = {amount: 0, date: new Date(), description: 'ZZZ'};
    spyOn(movementsService, 'addMovement').and.returnValue(of(payload));
    store.dispatch(new AddMovementAction(1, payload));
    store.select(state => state.movements.items).subscribe((items: Movement[]) => {
      expect(items.length).toEqual(1);
    });
  });

});
