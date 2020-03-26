import {async, TestBed} from '@angular/core/testing';

import { MovementsService } from './movements.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('MovementsService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    const service: MovementsService = TestBed.get(MovementsService);
    expect(service).toBeTruthy();
  });

  it ('should create a movement for an account', async(() => {
    const service: MovementsService = TestBed.get(MovementsService);
    service.addMovement(1, {date: new Date(), amount: 1, description: 'zzz'}).subscribe(
      (response) => expect(response).not.toBeNull(),
      (error) => fail(error)
    );
  }));

  it ('should list movements for an account', async(() => {
    const service: MovementsService = TestBed.get(MovementsService);
    service.fetchMovements(1).subscribe(
      (response) => expect(response).not.toBeNull(),
      (error) => fail(error)
    );
  }));
});
