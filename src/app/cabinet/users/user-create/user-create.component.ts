import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../services/cabinet/users/user.servise';
import { UserCreateDto } from '../../../models/cabinet/users/dtos/user/user-create-dto';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../models/common/status/status';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import { createUser } from '../../../store/users';
import { Actions } from '@ngrx/effects';
import { NotificationService } from '../../../services/cabinet/shared/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { selectRolesItems } from '../../../store/roles';
import { Role } from '../../../models/cabinet/users/role';
import { StatusCheckService } from '../../../services/cabinet/shared/status/status-check.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit, OnDestroy {

  public createUserForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl(),
    status: new FormControl('0'),
  });
  public roles: Role[];
  public statuses: Status[];
  public unsubscribe$ = new Subject();

  constructor(
    private userService: UserService,
    private rolesService: RolesService,
    private store: Store<fromRoot.State>,
    private actions$: Actions<any>,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private statusCheckService: StatusCheckService,
  ) { }

  ngOnInit(): void {
    this.store.select(selectRolesItems).pipe(takeUntil(this.unsubscribe$)).subscribe((roles: Role[]) => {
      if (roles && roles.length) {
        this.roles = this.statusCheckService.getActiveRecords(roles) as Role[];
      }
    });
    this.statuses = statuses;
  }

  public onSubmit(): void {
    const user: UserCreateDto = {
      email: this.createUserForm.value.email ?? '',
      password: this.createUserForm.value.password ?? '',
      role: (this.createUserForm.value.role === '0') ? this.roles[0] : this.createUserForm.value.role ?? null,
      status: (this.createUserForm.value.status === '0') ? this.statuses[0].key : this.createUserForm.value.status ?? ''
    };
    this.translateService.get('createdUserSuccess').pipe(takeUntil(this.unsubscribe$)).subscribe((text) => {
      this.store.dispatch(createUser({ user: user, apiMessage:  text }));
    });

    this.actions$.pipe(takeUntil(this.unsubscribe$)).subscribe((action) => {
      if (this.notificationService.isInitialized(action.apiMessage)) {
        this.notificationService.handleMessage(action.apiMessage, action.typeMessage, '/cabinet/users');
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
