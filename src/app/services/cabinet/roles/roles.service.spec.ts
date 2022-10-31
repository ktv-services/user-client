import { TestBed } from "@angular/core/testing";
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RolesService } from './roles.service';
import { Role } from "../../../models/cabinet/users/role";
import { RoleCreateDto } from '../../../models/cabinet/users/dtos/role/role-create-dto';


describe('RoleService', () => {
  let service: RolesService;
  let httpSpy: Spy<HttpClient>;

  const faceId: string = '11233';
  const role1: Role = {name: 'Role 1', status: 'new'};
  const role2: Role = {name: 'Role 2', status: 'active'};
  const role3: Role = {name: 'Role 3', status: 'active'};
  const fakeRoleData: Role[] = [role1, role2];
  const fakeActiveRoleData: Role[] = [role2, role3];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RolesService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RolesService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should get roles', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeRoleData);
    service.getRoles().subscribe(response => {
      expect(response[0].name).toEqual(fakeRoleData[0].name);
      expect(response[1].status).toEqual(fakeRoleData[1].status);
      done();
    });
    done.fail
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should get active roles', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeActiveRoleData);
    service.getRoles(true).subscribe(response => {
      console.log(response);
      expect(response[0].name).toEqual(fakeActiveRoleData[0].name);
      done();
    });
    done.fail
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should get role by id', (done: DoneFn) => {
    httpSpy.get.and.nextWith(role1);
    service.getRoleById(faceId).subscribe(response => {
      expect(response.name).toEqual(role1.name);
      done();
    });
    done.fail
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should create role', (done: DoneFn) => {
    const createRoleDto: RoleCreateDto = {name: 'Role 1', status: 'new'};
    httpSpy.post.and.nextWith(role1);
    service.createRole(createRoleDto).subscribe(response => {
      expect(response.name).toEqual(role1.name);
      done();
    });
    done.fail
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update role', (done: DoneFn) => {
    const createRoleDto: RoleCreateDto = {name: 'Role 11', status: 'new'};
    role1.name = 'Permission 11';
    httpSpy.put.and.nextWith(role1);
    service.editRole(faceId, createRoleDto).subscribe(response => {
      expect(response.name).toEqual(role1.name);
      done();
    });
    done.fail
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should remove role', (done: DoneFn) => {
    httpSpy.delete.and.nextWith(role1);
    service.removeRole(faceId).subscribe(response => {
      expect(response.name).toEqual(role1.name);
      done();
    });
    done.fail
    expect(httpSpy.delete.calls.count()).toBe(1);
  });

});
