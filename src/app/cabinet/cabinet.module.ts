import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CabinetComponent } from './cabinet.component';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { HeaderComponent } from './template/header/header.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationService } from '../services/cabinet/shared/pagination/pagination.service';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { WarningConfirmationComponent } from './shared/warning-confirmation/warning-confirmation.component';
import { AuthInterceptor } from './auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { StatusPipesModule } from '../pipes/cabinet/status/status.pipe.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    CabinetComponent,
    WarningConfirmationComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    TranslateModule,
    RolesModule,
    UsersModule,
    StatusPipesModule
  ],
  exports: [CabinetComponent, TranslateModule],
  providers: [
    PaginationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
export class CabinetModule { }
