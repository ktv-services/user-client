import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StatusCheckService } from './status-check.service';
import { Role } from '../../../../models/cabinet/users/role';
import { getRoles } from '../../../../testing/data/roles.data';

describe('StatusCheckService', () => {
  let service: StatusCheckService;
  const roles: Role[] = getRoles();

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
    const records: Role[] = roles;
    const result = service.getActiveRecords(records) as Role[];
    expect(result.length).toBe(3);
    expect(result[0].name).toBe(roles[0].name);
  });

});
