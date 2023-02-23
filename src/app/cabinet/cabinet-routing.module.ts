import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CabinetGuard } from './cabinet.guard';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserChangePasswordComponent } from './users/user-change-password/user-change-password.component';
import { RolesComponent } from './roles/roles.component';
import { RoleDetailComponent } from './roles/role-detail/role-detail.component';
import { RoleCreateComponent } from './roles/role-create/role-create.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';

const routes: Routes = [
  {
    path: 'cabinet', component: CabinetComponent, canActivate: [CabinetGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          breadcrumb: {
            label: 'home'
          }
        }
      },

      //Users
      {
        path: 'users',
        component: UsersComponent,
        data: {
          breadcrumb: {
            label: 'users'
          }
        }
      },
      {
        path: 'users/create',
        component: UserCreateComponent,
        data: {
          breadcrumb: {
            label: 'createUser',
            parent: [
              {
                label: 'users',
                link: '/cabinet/users'
              }
            ]
          }
        }
      },
      {
        path: 'users/:id',
        component: UserDetailComponent,
        data: {
          breadcrumb: {
            label: 'userInformation',
            parent: [
              {
                label: 'users',
                link: '/cabinet/users'
              }
            ]
          }
        }
      },
      {
        path: 'users/edit/:id',
        component: UserEditComponent,
        data: {
          breadcrumb: {
            label: 'editUser',
            parent: [
              {
                label: 'users',
                link: '/cabinet/users'
              }
            ]
          }
        }
      },
      {
        path: 'users/change-password/:id',
        component: UserChangePasswordComponent,
        data: {
          breadcrumb: {
            label: 'changePassword',
            parent: [
              {
                label: 'users',
                link: '/cabinet/users'
              }
            ]
          }
        }
      },
      //Users

      //Roles
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          breadcrumb: {
            label: 'roles'
          }
        }
      },
      {
        path: 'roles/create',
        component: RoleCreateComponent,
        data: {
          breadcrumb: {
            label: 'createRole',
            parent: [
              {
                label: 'roles',
                link: '/cabinet/roles'
              }
            ]
          }
        }
      },
      {
        path: 'roles/:id',
        component: RoleDetailComponent,
        data: {
          breadcrumb: {
            label: 'roleInformation',
            parent: [
              {
                label: 'roles',
                link: '/cabinet/roles'
              }
            ]
          }
        }
      },
      {
        path: 'roles/edit/:id',
        component: RoleEditComponent,
        data: {
          breadcrumb: {
            label: 'editRole',
            parent: [
              {
                label: 'roles',
                link: '/cabinet/roles'
              }
            ]
          }
        }
      },
      //Roles
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
