import {TestBed} from '@angular/core/testing';
import {ApiInterceptor} from './apierrors.interceptor.ts.service';


describe('Httpconfig.Interceptor.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiInterceptor = TestBed.get(ApiInterceptor);
    expect(service).toBeTruthy();
  });
});
