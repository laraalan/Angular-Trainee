import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard.routing';
import{ SidebarModule } from 'primeng/sidebar'
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { ChartModule } from 'primeng/chart'
import { SharedModule } from 'src/app/shared/shared.module';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [



    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    //PrimeNg
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    ChartModule,
    CardModule,
    //Shared
    SharedModule
  ],
  providers:[MessageService, CookieService]
})
export class DashboardModule { }
