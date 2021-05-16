import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ItemCategoryComponent } from './item-category.component'
import { AddItemCategoryComponent } from './add-item-category/add-item-category.component'
import { EditItemCategoryComponent } from './edit-item-category/edit-item-category.component'
import { ItemCategoryListComponent } from './item-category-list/item-category-list.component'
const itemCategoryRoute: Routes = [
    {
        path: "",
        component: ItemCategoryComponent,
        data: {
            title: 'Item Category List'
        },
        children: [
            {
                path: "",
                redirectTo: "list",
                pathMatch: "full"
            },
            {
                path: "list",
                component: ItemCategoryListComponent,
                data: {
                    title: 'Item Category List'
                },
            },
            {
                path: "add",
                component: AddItemCategoryComponent,
                data: {
                    title: 'Add Item Category'
                },
            },
            {
                path: ":id/edit",
                component: EditItemCategoryComponent,
                data: {
                    title: 'Edit Item Category'
                },
            },

        ]
    }

]

@NgModule({
    imports: [RouterModule.forChild(itemCategoryRoute)],
    exports: [RouterModule]
})

export class ItemCategoryRouting {

}