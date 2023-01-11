import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StatusCheckService } from './status-check.service';
import { getPermissionFirst, getPermissionNew, getPermissionSecond } from '../../../../testing/data/permissions.data';
import { Permission } from '../../../../models/cabinet/users/permission';

describe('StatusCheckService', () => {
  let service: StatusCheckService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatusCheckService,
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(StatusCheckService);
  });

  it('should get active records', () => {
    const records: Permission[] = [getPermissionFirst(), getPermissionSecond(), getPermissionNew()];
    const result = service.getActiveRecords(records) as Permission[];
    expect(result.length).toBe(2);
    expect(result[0].name).toBe(getPermissionFirst().name);
    expect(result[1].name).toBe(getPermissionNew().name);
  });

});
