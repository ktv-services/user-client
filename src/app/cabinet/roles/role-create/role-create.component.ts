import { Component, OnDestroy, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../models/common/status/status';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { RoleCreateDto } from '../../../models/cabinet/users/dtos/role/role-create-dto';
import { PermissionService } from '../../../services/cabinet/permissions/permission.service';
import { Permission } from '../../../models/cabinet/users/permission';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import { Actions } from '@ngrx/effects';
import { NotificationService } from '../../../services/cabinet/shared/notification/notification.service';
import { createRole } from '../../../store/roles';
import { TranslateService } from '@ngx-translate/core';
import { selectPermissionItems } from '../../../store/permissions';
import { StatusCheckService } from '../../../services/cabinet/shared/status/status-check.service';


@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit, OnDestroy {
  public createRoleForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    status: new FormControl('0'),
    permissions: new FormControl([]),
  });
  public statuses: Status[];
  public permissions: Permission[] = [];
  public unsubscribe$ = new Subject();

  constructor(
    private rolesService: RolesService,
    private permissionService: PermissionService,
    private store: Store<fromRoot.State>,
    private actions$: Actions<any>,
    private notificationService: NotificationService,
    private translateService: TranslateService,
    private statusCheckService: StatusCheckService,
  ) { }

  ngOnInit(): void {
    this.statuses = statuses;
    this.store.select(selectPermissionItems).pipe(takeUntil(this.unsubscribe$)).subscribe((permissions: Permission[]) => {
      if (permissions &&  permissions.length) {
        this.permissions = this.statusCheckService.getActiveRecords(permissions) as Permission[];
      }
    });
  }

  public onSubmit(): void {
    const role: RoleCreateDto = {
      name: this.createRoleForm.value.name ?? '',
      status: (this.createRoleForm.value.status === '0') ? this.statuses[0].key : this.createRoleForm.value.status ?? '',
      permissions: this.createRoleForm.value.permissions ? this.createRoleForm.value.permissions : null,
    };
    this.translateService.get('createdRoleSuccess').pipe(takeUntil(this.unsubscribe$)).subscribe((text) => {
      this.store.dispatch(createRole({ role: role, apiMessage:  text }));
    });
    this.actions$.pipe(takeUntil(this.unsubscribe$)).subscribe((action) => {
      if (this.notificationService.isInitialized(action.apiMessage)) {
        this.notificationService.handleMessage(action.apiMessage, action.typeMessage, '/cabinet/roles');
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
