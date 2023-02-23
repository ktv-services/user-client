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
import { RoleCreateComponent } from './role-create.component';
import { getRoleFirst } from '../../../testing/data/roles.data';
import { Role } from '../../../models/cabinet/users/role';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('RoleCreateComponent', () => {
  let component: RoleCreateComponent;
  let fixture: ComponentFixture<RoleCreateComponent>;

  const role: Role = getRoleFirst();
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
      declarations: [ RoleCreateComponent, TranslatePipeMock],
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
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('Check title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toBe('createRole');
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
    component.createRoleForm.get('name')?.setValue('Permission 1');
    component.createRoleForm.get('status')?.setValue('1');
    fixture.detectChanges();
    expect(component.createRoleForm.valid).toBeTrue();
    expect(compiled.querySelector('button').getAttribute('disabled')).toBeNull();
  });

});
