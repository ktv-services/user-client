import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslatePipeMock } from '../../testing/mocks/pipes/translate-pipe.mock';
import { PermissionsComponent } from './permissions.component';
import { PermissionService } from '../../services/cabinet/permissions/permission.service';
import { permissionServiceMock } from '../../testing/mocks/service/permission-service.mock';
import { getPermissionFirst, getPermissionSecond } from '../../testing/data/permissions.data';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';


describe('PermissionsComponent', () => {
  let component: PermissionsComponent;
  let fixture: ComponentFixture<PermissionsComponent>;

  const permissions = [getPermissionFirst(), getPermissionSecond()];
  let mockStore = jasmine.createSpyObj('Store', {
    'select': of(permissions),
  });

  const mockTranslateService = jasmine.createSpyObj('TranslateService', ['get']);
  const translateServiceMock = {
    get: mockTranslateService.get.and.returnValue(of('')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionsComponent, TranslatePipeMock],
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
        { provide: PermissionService, useValue: permissionServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get permissions', () => {
    component.getPermissions();
    expect(component.permissions[0].name).toBe(permissions[0].name);
  });

  it('Filter permissions', () => {
    component.permissions = permissions;
    component.permissionsFilterForm.get('name')?.patchValue('Permission 2');
    component.filterForm();
    expect(component.filteredPermissions[0].name).toBe(permissions[1].name);
  });

  it('Check all titles', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('filter');
    expect(compiled.querySelector('.header .title').textContent).toContain('permissions');
    expect(compiled.querySelector('.create-btn').textContent).toContain('create');
  });

});
