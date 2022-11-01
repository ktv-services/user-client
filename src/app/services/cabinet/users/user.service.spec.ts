import { TestBed } from "@angular/core/testing";
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './user.servise';
import { User } from '../../../models/cabinet/users/user';
import { RolesEnum } from '../../../models/cabinet/users/dtos/role/enums/roles-enum';
import { Role } from '../../../models/cabinet/users/role';
import { StatusEnum } from '../../../models/common/status/enums/statuses.enum';
import { UserCreateDto } from '../../../models/cabinet/users/dtos/user/user-create-dto';
import { UserEditDto } from '../../../models/cabinet/users/dtos/user/user-edit-dto';
import { UserChangePasswordDto } from '../../../models/cabinet/users/dtos/user/user-change-password-dto';

describe('UserService', () => {
  let service: UserService;
  let httpSpy: Spy<HttpClient>;

  const faceId: string = '11233';
  const faceSocialId: string = '0293xm9203m0';
  const roleUser: Role = {name: RolesEnum.USER, status: StatusEnum.ACTIVE};
  const roleAdmin: Role = {name: RolesEnum.ADMIN, status: StatusEnum.ACTIVE};
  const user1: User = {email: 'user1@gmail.com', status: StatusEnum.NEW, role: roleUser};
  const user2: User = {email: 'user1@gmail.com', status: StatusEnum.ACTIVE, role: roleAdmin};
  const fakeUsersData: User[] = [user1, user2];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should get users', (done: DoneFn) => {
    httpSpy.get.and.nextWith(fakeUsersData);
    service.getUsers().subscribe(response => {
      expect(response[0].email).toEqual(fakeUsersData[0].email);
      expect(response[1].status).toEqual(fakeUsersData[1].status);
      done();
    });
    done.fail
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should get user by id', (done: DoneFn) => {
    httpSpy.get.and.nextWith(user1);
    service.getUserById(faceId).subscribe(response => {
      expect(response.email).toEqual(user1.email);
      done();
    });
    done.fail
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should create user', (done: DoneFn) => {
    const createUserDto: UserCreateDto = {email: 'user1@gmail.com', password: '123', status: StatusEnum.NEW, role: roleUser};
    httpSpy.post.and.nextWith(user1);
    service.createUser(createUserDto).subscribe(response => {
      expect(response.email).toEqual(user1.email);
      done();
    });
    done.fail
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should update user', (done: DoneFn) => {
    const editUserDto: UserEditDto = {email: 'user11@gmail.com', status: StatusEnum.NEW, role: roleUser};
    httpSpy.put.and.nextWith(user1);
    service.editUser(faceId, editUserDto).subscribe(response => {
      expect(response.email).toEqual(user1.email);
      done();
    });
    done.fail
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should change user password', (done: DoneFn) => {
    const changePasswordUserDto: UserChangePasswordDto = {password: '1234'};
    httpSpy.put.and.nextWith(user1);
    service.changePasswordUser(faceId, changePasswordUserDto).subscribe(response => {
      expect(response.password).toEqual(user1.password);
      done();
    });
    done.fail
    expect(httpSpy.put.calls.count()).toBe(1);
  });

  it('should change unbind social', (done: DoneFn) => {
    httpSpy.get.and.nextWith(user1);
    service.unbindSocial(faceId, faceSocialId).subscribe(response => {
      expect(response.email).toEqual(user1.email);
      done();
    });
    done.fail
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should remove user', (done: DoneFn) => {
    httpSpy.delete.and.nextWith(user1);
    service.removeUser(faceId).subscribe(response => {
      expect(response.email).toEqual(user1.email);
      done();
    });
    done.fail
    expect(httpSpy.delete.calls.count()).toBe(1);
  });

});
