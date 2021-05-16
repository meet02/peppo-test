import {NgModule} from "@angular/core"
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddAdminUserComponent } from './add-admin-user/add-admin-user.component';
import { EditAdminUserComponent } from './edit-admin-user/edit-admin-user.component';
import {AdminUserRouting} from "./../admin-user-list/admin-user-router"
import {AdminUserListComponent} from "./admin-user-list.component";
import { UserlistComponent } from './userlist/userlist.component'

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common"



@NgModule({
    imports: [
        AdminUserRouting,
        MatInputModule,
        MatTableModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        ReactiveFormsModule,
        CommonModule     
    ],
    exports: [MatInputModule,
        MatTableModule,
        MatToolbarModule,
        MatCheckboxModule],
    declarations: [
      AddAdminUserComponent,
      EditAdminUserComponent,
      AdminUserListComponent,
      UserlistComponent
    ]
})
export class AdminUserModule {

}