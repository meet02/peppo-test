import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { DashboardComponent } from './views/dashboard/dashboard.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';


import { AdminUserRouting } from "./views/admin-user-list/admin-user-router"

import { AuthService } from "./auth.service"
import { BrandModule } from "./views/brand/brand.module"
import { ItemModule } from "./views/item/item.module"
import { ItemCategoryModule } from './views/item-category/item-category.module'

export const routes: Routes = [
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'home',
    component: DefaultLayoutComponent,
    canActivate: [AuthService],
    data: {
      title: 'Home'
    },
    children: [

      {
        path: 'admin',
        loadChildren: () => import('./views/admin-user-list/admin-user-module').then(m => m.AdminUserModule)
      },
      {
        path: 'brand',
        loadChildren: () => import('./views/brand/brand.module').then(m => m.BrandModule)
      },
      {
        path: 'item-category',
        loadChildren: () => import('./views/item-category/item-category.module').then(m => m.ItemCategoryModule)
      },
      {
        path: 'item',
        loadChildren: () => import('./views/item/item.module').then(m => m.ItemModule)
      },

      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },

    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
