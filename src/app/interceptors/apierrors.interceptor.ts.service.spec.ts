import {TestBed} from '@angular/core/testing';
import {ApiErrorsInterceptor} from './apierrors.interceptor.ts.service';


describe('Httpconfig.Interceptor.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiErrorsInterceptor = TestBed.get(ApiErrorsInterceptor);
    expect(service).toBeTruthy();
  });
});
