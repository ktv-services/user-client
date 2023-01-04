import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslatePipeMock } from '../../testing/mocks/pipes/translate-pipe.mock';
import { User } from '../../models/cabinet/users/user';
import { Role } from '../../models/cabinet/users/role';
import { getRoleFirst, getRoleSecond } from '../../testing/data/roles.data';
import { getUserFirst, getUserSecond } from '../../testing/data/users.data';
import { getPermissionFirst } from '../../testing/data/permissions.data';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const permission = getPermissionFirst();
  const role1: Role = getRoleFirst(permission);
  const role2: Role = getRoleSecond();
  const roles = [role1, role2];
  const user1: User = getUserFirst(role1);
  const user2: User = getUserSecond(role1);
  const user3: User = getUserSecond(role2);
  const users = [user1, user2, user3];

  let mockStore = jasmine.createSpyObj('Store', {
    'select': of(),
  });

  const mockTranslateService = jasmine.createSpyObj('TranslateService', ['get']);
  const translateServiceMock = {
    get: mockTranslateService.get.and.returnValue(of('Users statistic')),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, TranslatePipeMock],
      imports: [
        TranslateModule
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceMock },
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should be userStatistic', () => {
    const compiled = fixture.debugElement.nativeElement;
    translateServiceMock.get(compiled.querySelector('h2').textContent).subscribe((text: any) => {
      expect(text).toContain('Users statistic');
    });
  });

  it('should setRolesCount', () => {
    component.roles = roles;
    component.users = users;
    component.setRolesCount();
    expect(component.rolesCount.get('Role 1')).toBe(2)
    expect(component.rolesCount.get('Role 2')).toBe(1)
  });


});
