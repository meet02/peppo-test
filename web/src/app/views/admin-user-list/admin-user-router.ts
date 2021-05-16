import { Routes, RouterModule} from "@angular/router";

import { AddAdminUserComponent } from "./add-admin-user/add-admin-user.component";
import {AdminUserListComponent} from "./admin-user-list.component"
import {EditAdminUserComponent} from "./../admin-user-list/edit-admin-user/edit-admin-user.component"
import {NgModule} from "@angular/core"
import { UserlistComponent } from "./userlist/userlist.component";

const adminUserModule: Routes=[
    {
        path:"",
        component:AdminUserListComponent,
        data: {
            title: 'Admin User List'
          },
        children: [
            {
                path:"",
                redirectTo:"list",
                pathMatch:"full"
            },
            {
                path:"list",
                component:UserlistComponent,
                data: {
                    title: 'Admin User List'
                  },
            },
            {
                path:"add",
                component:AddAdminUserComponent,
                data: {
                    title: 'Admin User Add'
                  },
            },
            {
                path:":id/edit",
                component:EditAdminUserComponent,
                data: {
                    title: 'Edit Admin'
                  },
            },
            
        ]
    }

]

@NgModule({
    imports:[RouterModule.forChild(adminUserModule)],
    exports:[RouterModule]
})
export class AdminUserRouting {
    constructor()
    {

    }
}