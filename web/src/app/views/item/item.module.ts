import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemRoutingModule } from './item.routing'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ItemListComponent } from './item-list/item-list.component';
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
        ItemRoutingModule,
        NgMultiSelectDropDownModule

    ],
    declarations: [

        AddItemComponent,
        EditItemComponent,
        ItemListComponent
    ],
    providers: [

    ]
})

export class ItemModule {

}