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
import { RoleEditComponent } from './role-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('RoleEditComponent', () => {
  let component: RoleEditComponent;
  let fixture: ComponentFixture<RoleEditComponent>;

  const permission: Permission = getPermissionFirst();
  const role: Role = getRoleFirst(permission);
  let mockStore = jasmine.createSpyObj('Store', {
    'select': of(role),
  });
  let mockActions = jasmine.createSpyObj('Actions', {
    'select': of(role),
  });

  const mockTranslateService = jasmine.createSpyObj('TranslateService', ['get']);
  const translateServiceMock = {
    get: mockTranslateService.get.and.returnValue(of('')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleEditComponent, TranslatePipeMock],
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
        { provide: PermissionService, useValue: permissionServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Check title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toBe('editRole');
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
    const permissionId = role.permissions?.length ? role?.permissions[0]._id : '1111';
    expect(component.editRoleForm.get('name')?.value).toBe(role.name);
    expect(component.editRoleForm.get('status')?.value).toBe(role.status);
    expect(component.editRoleForm.get('permissions')?.value).toEqual([permissionId]);
  });

  it('should make form invalid', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.editRoleForm.get('name')?.setValue('');
    fixture.detectChanges();
    expect(compiled.querySelector('button').getAttribute('disabled')).toBe('');
  });



});
