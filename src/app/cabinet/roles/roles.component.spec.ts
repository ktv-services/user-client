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
import { RolesComponent } from './roles.component';
import { getRoleFirst, getRoleSecond } from '../../testing/data/roles.data';
import { rolesServiceMock } from '../../testing/mocks/service/roles-service.mock';
import { RolesService } from '../../services/cabinet/roles/roles.service';


describe('RolesComponent', () => {
  let component: RolesComponent;
  let fixture: ComponentFixture<RolesComponent>;

  const roles = [getRoleFirst(), getRoleSecond()];
  let mockStore = jasmine.createSpyObj('Store', {
    'select': of(roles),
  });

  const mockTranslateService = jasmine.createSpyObj('TranslateService', ['get']);
  const translateServiceMock = {
    get: mockTranslateService.get.and.returnValue(of('')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesComponent, TranslatePipeMock],
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
        { provide: RolesService, useValue: rolesServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get roles', () => {
    component.getRoles();
    expect(component.roles[0].name).toBe(roles[0].name);
  });

  it('Filter roles', () => {
    component.roles = roles;
    component.rolesFilterForm.get('name')?.patchValue('Role 2');
    component.filterForm();
    expect(component.filteredRoles[0].name).toBe(roles[1].name);
  });

  it('Check all titles', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('filter');
    expect(compiled.querySelector('.header .title').textContent).toContain('roles');
    expect(compiled.querySelector('.create-btn').textContent).toContain('create');
  });

});
