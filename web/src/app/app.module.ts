import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { ItemCategoryComponent } from './views/item-category/item-category.component'
import { MatPaginatorModule } from '@angular/material/paginator';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';


// Inbuid Modules

import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from '@full-fledged/alerts';

// Custom Module

import { AdminUserModule } from "../app/views/admin-user-list/admin-user-module"
import { ItemCategoryModule } from "../app/views/item-category/item-category.module"
import { BrandModule } from "../app/views/brand/brand.module"
import { ItemModule } from '../app/views/item/item.module'
import { ToastNotificationsModule } from "ngx-toast-notifications";


import { authInterceptorProviders } from "../app/auth-intercetor-service";
import { BrandComponent } from './views/brand/brand.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { CommonModule } from '@angular/common';
import { ItemComponent } from './views/item/item.component';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    AdminUserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastNotificationsModule.forRoot({ duration: 6000, position: "top-right" }),
    BrandModule,
    ItemCategoryModule,
    CommonModule,
    ItemModule,
    MatPaginatorModule
    // AlertModule.forRoot({maxMessages: 5, timeout: 5000, positionX: '})
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    BrandComponent,
    ItemComponent

  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
