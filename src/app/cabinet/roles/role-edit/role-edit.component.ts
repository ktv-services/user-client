import { Component, OnDestroy, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Status } from '../../../models/common/status/status';
import { ActivatedRoute } from '@angular/router';
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
import {editRole, selectRoleItem} from '../../../store/roles';
import { TranslateService } from '@ngx-translate/core';
import { selectPermissionItems } from '../../../store/permissions';
import {Role} from "../../../models/cabinet/users/role";
import {RoleDetailDto} from "../../../models/cabinet/users/dtos/role/role-detail-dto";


@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit, OnDestroy {
  public editRoleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('0'),
    permissions: new FormControl(),
  });
  public statuses: Array<Status>;
  public role: RoleCreateDto;
  public id: string;
  public permissions: Array<Permission> = [];
  public unsubscribe$ = new Subject();

  constructor(
    private rolesService: RolesService,
    private route: ActivatedRoute,
    private permissionService: PermissionService,
    private store: Store<fromRoot.State>,
    private actions$: Actions<any>,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.statuses = statuses;
    this.id = this.route.snapshot.params['id'];
    this.store.select(selectRoleItem({id: this.id})).pipe(takeUntil(this.unsubscribe$)).subscribe((response: Role | undefined) => {
      if (response) {
        this.role = response as RoleDetailDto;
        this.fillEditPermissionForm(response);
      }
    });
    this.store.select(selectPermissionItems).pipe(takeUntil(this.unsubscribe$)).subscribe((permissions: Permission[]) => {
      if (permissions &&  permissions.length) {
        this.permissions = permissions;
      }
    });
  }

  public onSubmit(): void {
    const role: RoleCreateDto = {
      name: this.editRoleForm.value.name ?? '',
      status: (this.editRoleForm.value.status === '0') ? this.statuses[0].key : this.editRoleForm.value.status ?? '',
      permissions: this.editRoleForm.value.permissions ? this.editRoleForm.value.permissions : null,
    };
    this.translateService.get('editedRoleSuccess').pipe(takeUntil(this.unsubscribe$)).subscribe((text) => {
      this.store.dispatch(editRole({ roleId: this.id, role: role, apiMessage: text }));
    });
    this.actions$.pipe(takeUntil(this.unsubscribe$)).subscribe((action) => {
      if (this.notificationService.isInitialized(action.apiMessage)) {
        this.notificationService.handleMessage(action.apiMessage, action.typeMessage, '/cabinet/roles');
      }
    });
  }

  private fillEditPermissionForm(role: RoleCreateDto): void {
    const permissionIds = role.permissions?.map((item: any) => item._id);
    this.editRoleForm.patchValue({name: role.name, status: role.status, permissions: permissionIds});
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
