import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginationService } from '../../services/cabinet/shared/pagination/pagination.service';
import { Status } from '../../models/common/status/status';
import { statuses } from '../../models/common/status/lists/statuses-list';
import { PermissionService } from '../../services/cabinet/permissions/permission.service';
import { Permission } from '../../models/cabinet/users/permission';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/core.state';
import { selectPermissionItems } from '../../store/permissions';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit, OnDestroy {
  public permissions: Permission[] = [];
  public filteredPermissions: Permission[] = [];
  public statuses: Status[];
  public permissionsFilterForm = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
  });
  displayedColumns: string[] = ['name', 'status', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public unsubscribe$ = new Subject();

  constructor(
    public paginationService: PaginationService,
    private permissionService: PermissionService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.getPermissions();
    this.statuses = statuses;
    this.filterForm();
  }

  public getPermissions(): void {
    this.store.select(selectPermissionItems).pipe(takeUntil(this.unsubscribe$)).subscribe((permissions: Permission[]) => {
      if (permissions &&  permissions.length) {
        this.permissions = permissions;
        this.setPaginationSource(permissions);
      }
    });
  }

  public filterForm(): void {
    this.permissionsFilterForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((form) => {
      this.filteredPermissions = this.permissions.filter((permission) => {
        return (form.name ? permission.name.includes(form.name) : true)
          && (form.status ? permission.status === form.status : true);
      });
      this.setPaginationSource(this.filteredPermissions);
    });
  }

  public setPaginationSource(permissions: Permission[]): void {
    this.paginationService.dataSource = new MatTableDataSource<any>(permissions);
    this.paginationService.dataSource.paginator = this.paginator;
    this.paginationService.iterator(permissions);
  }

  public clearFilters(): void {
    this.permissionsFilterForm.reset();
    this.getPermissions();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
