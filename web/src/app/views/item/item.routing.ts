import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ItemComponent } from './item.component'
import { AddItemComponent } from './add-item/add-item.component'
import { EditItemComponent } from './edit-item/edit-item.component'
import { ItemListComponent } from "./item-list/item-list.component"

const itemRouting: Routes = [
    {
        path: "",
        component: ItemComponent,
        data: {
            title: 'Item List'
        },
        children: [
            {
                path: "",
                redirectTo: "list",
                pathMatch: "full"
            },
            {
                path: "list",
                component: ItemListComponent,
                data: {
                    title: 'Item List'
                },
            },
            {
                path: "add",
                component: AddItemComponent,
                data: {
                    title: 'Add Item'
                },
            },
            {
                path: ":id/edit",
                component: EditItemComponent,
                data: {
                    title: 'Edit Item'
                },
            },

        ]
    }

]

@NgModule({
    imports: [RouterModule.forChild(itemRouting)],
    exports: [RouterModule]
})


export class ItemRoutingModule {

}