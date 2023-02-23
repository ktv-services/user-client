import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslatePipeMock } from '../../../testing/mocks/pipes/translate-pipe.mock';
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
import { getRoleFirst } from '../../../testing/data/roles.data';
import { Role } from '../../../models/cabinet/users/role';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserCreateComponent } from './user-create.component';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { userServiceMock } from '../../../testing/mocks/service/user-service.mock';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { rolesServiceMock } from '../../../testing/mocks/service/roles-service.mock';
import {User} from "../../../models/cabinet/users/user";
import {getUserFirst, getUserSecond} from "../../../testing/data/users.data";


describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  const role: Role = getRoleFirst();
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
      declarations: [ UserCreateComponent, TranslatePipeMock],
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
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Check title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toBe('createUser');
  });

  it('Check statuses correct', () => {
    expect(component.statuses[0].key).toBe('new');
    expect(component.statuses[0].title).toBe('New');

    expect(component.statuses[1].key).toBe('active');
    expect(component.statuses[1].title).toBe('Active');

    expect(component.statuses[2].key).toBe('blocked');
    expect(component.statuses[2].title).toBe('Blocked');
  });


  it('should make form invalid', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').getAttribute('disabled')).toBe('');
  });

  it('should make form valid', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.createUserForm.get('email')?.setValue('user1@gmail.com');
    component.createUserForm.get('password')?.setValue('123');
    component.createUserForm.get('status')?.setValue('1');
    fixture.detectChanges();
    expect(component.createUserForm.valid).toBeTrue();
    expect(compiled.querySelector('button').getAttribute('disabled')).toBeNull();
  });

});
