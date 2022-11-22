import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/cabinet/users/user.servise';
import { User} from '../../models/cabinet/users/user';
import { FormControl, FormGroup } from '@angular/forms';
import { Status } from '../../models/common/status/status';
import { statuses } from '../../models/common/status/lists/statuses-list';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationService } from '../../services/cabinet/shared/pagination/pagination.service';
import { RolesService } from '../../services/cabinet/roles/roles.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/core.state';
import { selectUserItems } from '../../store/users';
import { selectRolesItems } from '../../store/roles';
import { Role } from '../../models/cabinet/users/role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: Array<User> = [];
  public roles: Array<Role>;
  public statuses: Array<Status>;
  public usersFilterForm = new FormGroup({
    email: new FormControl(null),
    role: new FormControl(null),
    status: new FormControl(null),
  });
  displayedColumns: string[] = ['email', 'role', 'status', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public unsubscribe$ = new Subject();

  constructor(
    public paginationService: PaginationService,
    private userService: UserService,
    private rolesService: RolesService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.store.select(selectRolesItems).pipe(takeUntil(this.unsubscribe$)).subscribe((roles: Role[]) => {
      if (roles && roles.length) {
        this.roles = roles;
      }
    });
    this.statuses = statuses;
    this.filterForm();
  }

  private getUsers(): void {
    this.store.select(selectUserItems).pipe(takeUntil(this.unsubscribe$)).subscribe((users: User[]) => {
      if (users && users.length) {
        this.users = users;
        this.setPaginationSource(users);
      }
    });
  }

  private filterForm(): void {
    this.usersFilterForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((form) => {
      const filteredUsers = this.users.filter((user) => {
        return (form.email ? user.email.includes(form.email) : true)
          && (form.role ? user.role.name === form.role : true)
          && (form.status ? user.status === form.status : true);
      });
      this.setPaginationSource(filteredUsers);
    });
  }

  public setPaginationSource(users: User[]): void {
    this.paginationService.dataSource = new MatTableDataSource<any>(users);
    this.paginationService.dataSource.paginator = this.paginator;
    this.paginationService.iterator(users);
  }

  public clearFilters(): void {
    this.usersFilterForm.reset();
    this.getUsers();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
