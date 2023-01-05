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
import { UserService } from '../../../services/cabinet/users/user.servise';
import { userServiceMock } from '../../../testing/mocks/service/user-service.mock';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { rolesServiceMock } from '../../../testing/mocks/service/roles-service.mock';
import { User } from '../../../models/cabinet/users/user';
import { getUserFirst}  from '../../../testing/data/users.data';
import { UserChangePasswordComponent } from './user-change-password.component';


describe('UserChangePasswordComponent', () => {
  let component: UserChangePasswordComponent;
  let fixture: ComponentFixture<UserChangePasswordComponent>;

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
      declarations: [ UserChangePasswordComponent, TranslatePipeMock],
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
    fixture = TestBed.createComponent(UserChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Check title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toBe('changePassword');
  });

  it('should make form invalid', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').getAttribute('disabled')).toBe('');
  });

  it('should make form valid', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.changePasswordUserForm.get('password')?.setValue('123');
    component.changePasswordUserForm.get('confirmPassword')?.setValue('123');
    fixture.detectChanges();
    expect(component.changePasswordUserForm.valid).toBeTrue();
    expect(compiled.querySelector('button').getAttribute('disabled')).toBeNull();
  });



});
