import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslatePipeMock } from '../../../testing/mocks/pipes/translate-pipe.mock';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { permissionServiceMock } from '../../../testing/mocks/service/permission-service.mock';
import { getPermissionFirst } from '../../../testing/data/permissions.data';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationService } from '../../../services/cabinet/shared/notification/notification.service';
import { notificationServiceMock } from '../../../testing/mocks/service/notification-service.mock';
import { Actions } from '@ngrx/effects';
import { MatCardModule } from '@angular/material/card';
import { expect } from '@angular/flex-layout/_private-utils/testing';
import { Permission } from '../../../models/cabinet/users/permission';
import { Role } from '../../../models/cabinet/users/role';
import { getRoleFirst } from '../../../testing/data/roles.data';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserEditComponent } from './user-edit.component';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { userServiceMock } from '../../../testing/mocks/service/user-service.mock';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { rolesServiceMock } from '../../../testing/mocks/service/roles-service.mock';
import { User } from '../../../models/cabinet/users/user';
import { getUserFirst}  from '../../../testing/data/users.data';


describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  const permission: Permission = getPermissionFirst();
  const role: Role = getRoleFirst(permission);
  const user: User = getUserFirst(role);
  let mockStore = jasmine.createSpyObj('Store', {
    'select': of(user),
  });
  let mockActions = jasmine.createSpyObj('Actions', {
    'select': of(user),
  });

  const mockTranslateService = jasmine.createSpyObj('TranslateService', ['get']);
  const translateServiceMock = {
    get: mockTranslateService.get.and.returnValue(of('')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditComponent, TranslatePipeMock],
      imports: [
        HttpClientTestingModule,
        TranslateModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatTableModule,
        MatDividerModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCardModule
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: Store, useValue: mockStore },
        { provide: Actions, useValue: mockActions },
        { provide: UserService, useValue: userServiceMock },
        { provide: RolesService, useValue: rolesServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Check title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toBe('editUser');
  });

  it('Check statuses correct', () => {
    expect(component.statuses[0].key).toBe('new');
    expect(component.statuses[0].title).toBe('New');

    expect(component.statuses[1].key).toBe('active');
    expect(component.statuses[1].title).toBe('Active');

    expect(component.statuses[2].key).toBe('blocked');
    expect(component.statuses[2].title).toBe('Blocked');
  });

  it('should fill form', () => {
    expect(component.editUserForm.get('email')?.value).toBe(user.email);
    expect(component.editUserForm.get('status')?.value).toBe(user.status);
    expect(component.editUserForm.get('role')?.value).toBe(user.role.name);
  });

  it('should make form invalid', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.editUserForm.get('email')?.setValue('');
    fixture.detectChanges();
    expect(compiled.querySelector('button').getAttribute('disabled')).toBe('');
  });



});
