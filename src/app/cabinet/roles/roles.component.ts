import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginationService } from '../../services/cabinet/shared/pagination/pagination.service';
import { Status } from '../../models/common/status/status';
import { statuses } from '../../models/common/status/lists/statuses-list';
import { Role } from '../../models/cabinet/users/role';
import { RolesService } from '../../services/cabinet/roles/roles.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/core.state';
import { selectRolesItems } from '../../store/roles';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {
  public roles: Role[] = [];
  public filteredRoles: Role[] = [];
  public statuses: Status[];
  public rolesFilterForm = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
  });
  displayedColumns: string[] = ['name', 'status', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public unsubscribe$ = new Subject();

  constructor(
    public paginationService: PaginationService,
    private rolesService: RolesService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.statuses = statuses;
    this.filterForm();
  }

  public getRoles(): void {
    this.store.select(selectRolesItems).pipe(takeUntil(this.unsubscribe$)).subscribe((roles: Role[]) => {
      if (roles && roles.length) {
        this.roles = roles;
        this.setPaginationSource(roles);
      }
    });
  }

  public filterForm(): void {
    this.rolesFilterForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((form) => {
      this.filteredRoles = this.roles.filter((role) => {
        return (form.name ? role.name.includes(form.name) : true)
          && (form.status ? role.status === form.status : true);
      });
      this.setPaginationSource(this.filteredRoles);
    });
  }

  public setPaginationSource(roles: Role[]): void {
    this.paginationService.dataSource = new MatTableDataSource<any>(roles);
    this.paginationService.dataSource.paginator = this.paginator;
    this.paginationService.iterator(roles);
  }

  public clearFilters(): void {
    this.rolesFilterForm.reset();
    this.getRoles();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
