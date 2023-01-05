import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslatePipeMock } from '../../testing/mocks/pipes/translate-pipe.mock';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getRoleFirst } from '../../testing/data/roles.data';
import { rolesServiceMock } from '../../testing/mocks/service/roles-service.mock';
import { RolesService } from '../../services/cabinet/roles/roles.service';
import { getPermissionFirst } from '../../testing/data/permissions.data';
import { UsersComponent } from './users.component';
import { getUserFirst, getUserSecond } from '../../testing/data/users.data';
import { User } from '../../models/cabinet/users/user';
import { Role } from '../../models/cabinet/users/role';
import { Permission } from '../../models/cabinet/users/permission';
import { userServiceMock } from '../../testing/mocks/service/user-service.mock';
import { UserService } from '../../services/cabinet/users/user.servise';


describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  const permission: Permission = getPermissionFirst();
  const role: Role = getRoleFirst(permission);
  const users: User[] = [getUserFirst(role), getUserSecond(role)];

  let mockStore = jasmine.createSpyObj('Store', {
    'select': of(users),
  });

  const mockTranslateService = jasmine.createSpyObj('TranslateService', ['get']);
  const translateServiceMock = {
    get: mockTranslateService.get.and.returnValue(of('')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent, TranslatePipeMock],
      imports: [
        TranslateModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatTableModule,
        MatDividerModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: Store, useValue: mockStore },
        { provide: UserService, useValue: userServiceMock },
        { provide: RolesService, useValue: rolesServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get users', () => {
    component.getUsers();
    expect(component.users[0].email).toBe(users[0].email);
  });

  it('Filter users', () => {
    component.users = users;
    component.usersFilterForm.get('email')?.patchValue('user2@gmail.com');
    component.filterForm();
    expect(component.filteredUsers[0].email).toBe(users[1].email);
  });

  it('Check all titles', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('filter');
    expect(compiled.querySelector('.header .title').textContent).toContain('users');
    expect(compiled.querySelector('.create-btn').textContent).toContain('create');
  });

});
