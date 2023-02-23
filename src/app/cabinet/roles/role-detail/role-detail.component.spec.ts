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
import { RoleDetailComponent } from './role-detail.component';
import { Role } from '../../../models/cabinet/users/role';
import { getRoleFirst } from '../../../testing/data/roles.data';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatListModule } from '@angular/material/list';


describe('RoleDetailComponent', () => {
  let component: RoleDetailComponent;
  let fixture: ComponentFixture<RoleDetailComponent>;

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
      declarations: [ RoleDetailComponent, TranslatePipeMock],
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
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get permission', () => {
    expect(component.role?.name).toBe(role.name);
  });

  it('Check title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('roleInformation');
  });

  it('Check buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.btn-edit').getAttribute('ng-reflect-router-link')).toContain(`/cabinet/roles/edit/${role._id}`);
    expect(compiled.querySelector('.btn-edit').textContent).toContain('edit');
    expect(compiled.querySelector('.btn-delete').textContent).toContain('delete');
  });

  it('Check table data', () => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelectorAll('mat-card')[0].querySelector('mat-card-title').textContent).toContain('id');
    expect(compiled.querySelectorAll('mat-card')[0].querySelector('mat-card-subtitle').textContent).toContain(role._id);

    expect(compiled.querySelectorAll('mat-card')[1].querySelector('mat-card-title').textContent).toContain('name');
    expect(compiled.querySelectorAll('mat-card')[1].querySelector('mat-card-subtitle').textContent).toContain(role.name);

    expect(compiled.querySelectorAll('mat-card')[2].querySelector('mat-card-title').textContent).toContain('status');
    expect(compiled.querySelectorAll('mat-card')[2].querySelector('mat-card-subtitle').textContent).toContain(role.status);
  });


});
