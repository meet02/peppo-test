import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { BrandComponent } from './brand.component'
import { AddBrandComponent } from './add-brand/add-brand.component'
import { EditBrandComponent } from "./edit-brand/edit-brand.component"
import { BrandListComponent } from "./brand-list/brand-list.component"

const brandModule: Routes = [
    {
        path: "",
        component: BrandComponent,
        data: {
            title: 'Brand List'
        },
        children: [
            {
                path: "",
                redirectTo: "list",
                pathMatch: "full"
            },
            {
                path: "list",
                component: BrandListComponent,
                data: {
                    title: 'Brand List'
                },
            },
            {
                path: "add",
                component: AddBrandComponent,
                data: {
                    title: 'Brand Add'
                },
            },
            {
                path: ":id/edit",
                component: EditBrandComponent,
                data: {
                    title: 'Edit Brand'
                },
            },

        ]
    }

]

@NgModule({
    imports: [RouterModule.forChild(brandModule)],
    exports: [RouterModule]
})

export class BrandRouting {

}