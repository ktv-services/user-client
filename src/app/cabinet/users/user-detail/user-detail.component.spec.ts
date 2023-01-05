import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslatePipeMock } from '../../../testing/mocks/pipes/translate-pipe.mock';
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
import { Permission } from '../../../models/cabinet/users/permission';
import { Role } from '../../../models/cabinet/users/role';
import { getRoleFirst } from '../../../testing/data/roles.data';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatListModule } from '@angular/material/list';
import { UserDetailComponent } from './user-detail.component';
import { User } from '../../../models/cabinet/users/user';
import { getUserFirst } from '../../../testing/data/users.data';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { userServiceMock } from '../../../testing/mocks/service/user-service.mock';


describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

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
      declarations: [ UserDetailComponent, TranslatePipeMock],
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
        MatCardModule,
        MatListModule
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: Store, useValue: mockStore },
        { provide: Actions, useValue: mockActions },
        { provide: UserService, useValue: userServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get user', () => {
    expect(component.user?.email).toBe(user.email);
  });

  it('Check title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('userInformation');
  });

  it('Check buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.btn-edit').getAttribute('ng-reflect-router-link')).toContain(`/cabinet/users/edit/${user._id}`);
    expect(compiled.querySelector('.btn-change-password').getAttribute('ng-reflect-router-link')).toContain(`/cabinet/users/change-password`);
    expect(compiled.querySelector('.btn-edit').textContent).toContain('edit');
    expect(compiled.querySelector('.btn-change-password').textContent).toContain('changePassword');
    expect(compiled.querySelector('.btn-delete').textContent).toContain('delete');
  });

  it('Check table data', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelectorAll('mat-card')[0].querySelector('mat-card-title').textContent).toContain('id');
    expect(compiled.querySelectorAll('mat-card')[0].querySelector('mat-card-subtitle').textContent).toContain(user._id);

    expect(compiled.querySelectorAll('mat-card')[1].querySelector('mat-card-title').textContent).toContain('email');
    expect(compiled.querySelectorAll('mat-card')[1].querySelector('mat-card-subtitle').textContent).toContain(user.email);

    expect(compiled.querySelectorAll('mat-card')[2].querySelector('mat-card-title').textContent).toContain('status');
    expect(compiled.querySelectorAll('mat-card')[2].querySelector('mat-card-subtitle').textContent).toContain(user.status);

    expect(compiled.querySelectorAll('mat-card')[3].querySelector('mat-card-title').textContent).toContain('role');
    expect(compiled.querySelectorAll('mat-card')[3].querySelector('mat-card-subtitle').textContent).toContain(user.role.name);

  });


});
