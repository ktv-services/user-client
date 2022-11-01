import { TestBed } from "@angular/core/testing";
import { NotificationService } from './notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { redirectServiceMock } from '../../../../testing/mocks/service/redirect-service.mock';
import { RedirectService } from '../redirect/redirect.service';
import { of } from 'rxjs';

describe('NotificationService', () => {
  let service: NotificationService;
  let translateServiceSpy = jasmine.createSpyObj('Service', {
    'get': of('mock data'),
  });
  let matSnackBarSpy = jasmine.createSpyObj('Service', {
    'open': 'mock data',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: TranslateService, useValue: translateServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: RedirectService, useValue: redirectServiceMock },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be initialized', () => {
    const result = service.isInitialized('test');
    expect(result).toBeTrue();
  });

  it('should be initialized', () => {
    const result = service.handleMessage('TestMessage', 'error', '/', false);
    expect(result).toBeUndefined();
  });


});
