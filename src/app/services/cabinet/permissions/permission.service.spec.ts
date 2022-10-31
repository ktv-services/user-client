import { TestBed } from "@angular/core/testing";
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PermissionService } from './permission.service';
import { Permission } from "../../../models/cabinet/users/permission";
import {PermissionCreateDto} from "../../../models/cabinet/users/dtos/permission/permission-create-dto";


describe('PermissionService', () => {
  let service: PermissionService;
  let httpSpy: Spy<HttpClient>;

  const faceId: string = '11233';
  const permission1: Permission = {name: 'Permission 1', status: 'new'};
  const permission2: Permission = {name: 'Permission 2', status: 'active'};
  const permission3: Permission = {name: 'Permission 3', status: 'active'};
  const fakePermissionData: Permission[] = [permission1, permission2];
  const fakeActivePermissionData: Permission[] = [permission2, permission3];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PermissionService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PermissionService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should get permissions', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakePermissionData);
    service.getPermissions().subscribe(response => {
      expect(response[0].name).toEqual(fakePermissionData[0].name);
      expect(response[1].status).toEqual(fakePermissionData[1].status);
      done();
    });
    done.fail
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should get active permissions', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeActivePermissionData);
    service.getPermissions(true).subscribe(response => {
      console.log(response);
      expect(response[0].name).toEqual(fakeActivePermissionData[0].name);
      done();
    });
    done.fail
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should get permission by id', (done: DoneFn) => {
    httpSpy.get.and.nextWith(permission1);
    service.getPermissionById(faceId).subscribe(response => {
      expect(response.name).toEqual(permission1.name);
      done();
    });
    done.fail
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should create permission', (done: DoneFn) => {
    const createPermissionDto: PermissionCreateDto = {name: 'Permission 1', status: 'new'};
    httpSpy.post.and.nextWith(permission1);
    service.createPermission(createPermissionDto).subscribe(response => {
      expect(response.name).toEqual(permission1.name);
      done();
    });
    done.fail
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update permission', (done: DoneFn) => {
    const createPermissionDto: PermissionCreateDto = {name: 'Permission 11', status: 'new'};
    permission1.name = 'Permission 11';
    httpSpy.put.and.nextWith(permission1);
    service.editPermission(faceId, createPermissionDto).subscribe(response => {
      expect(response.name).toEqual(permission1.name);
      done();
    });
    done.fail
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should remove permission', (done: DoneFn) => {
    httpSpy.delete.and.nextWith(permission1);
    service.removePermission(faceId).subscribe(response => {
      expect(response.name).toEqual(permission1.name);
      done();
    });
    done.fail
    expect(httpSpy.delete.calls.count()).toBe(1);
  });

});
