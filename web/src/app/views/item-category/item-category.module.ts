import { NgModule } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AddItemCategoryComponent } from "./add-item-category/add-item-category.component";
import { EditItemCategoryComponent } from "./edit-item-category/edit-item-category.component";
import { ItemCategoryRouting } from "./item-category.router";
import { ItemCategoryComponent } from "./item-category.component";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ItemCategoryListComponent } from './item-category-list/item-category-list.component';
@NgModule({
    imports: [
        MatInputModule,
        MatTableModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        ReactiveFormsModule,
        CommonModule,
        ItemCategoryRouting,
        NgMultiSelectDropDownModule
    ],
    declarations: [
        ItemCategoryComponent,
        AddItemCategoryComponent,
        EditItemCategoryComponent,
        ItemCategoryListComponent,
    ],
    exports: [NgMultiSelectDropDownModule],
    providers: [],
})
export class ItemCategoryModule { }
