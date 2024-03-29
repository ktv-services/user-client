import { Component, OnDestroy, OnInit } from '@angular/core';
import { statuses } from '../../../models/common/status/lists/statuses-list';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../../models/common/status/status';
import { RolesService } from '../../../services/cabinet/roles/roles.service';
import { RoleCreateDto } from '../../../models/cabinet/users/dtos/role/role-create-dto';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../store/core.state';
import { Actions } from '@ngrx/effects';
import { NotificationService } from '../../../services/cabinet/shared/notification/notification.service';
import { createRole } from '../../../store/roles';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit, OnDestroy {
  public createRoleForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    status: new FormControl('0'),
  });
  public statuses: Status[];
  public unsubscribe$ = new Subject();

  constructor(
    private rolesService: RolesService,
    private store: Store<fromRoot.State>,
    private actions$: Actions<any>,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.statuses = statuses;
  }

  public onSubmit(): void {
    const role: RoleCreateDto = {
      name: this.createRoleForm.value.name ?? '',
      status: (this.createRoleForm.value.status === '0') ? this.statuses[0].key : this.createRoleForm.value.status ?? '',
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
