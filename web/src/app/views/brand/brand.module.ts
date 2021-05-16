import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {ReactiveFormsModule} from '@angular/forms'
import {CommonModule} from '@angular/common';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component'
import {BrandRouting} from './brand.router';
import { BrandListComponent } from './brand-list/brand-list.component'

@NgModule({
    imports:[
        MatInputModule,
        MatTableModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatSortModule,
        ReactiveFormsModule,
        CommonModule,
        BrandRouting
    ],
    declarations:[
    AddBrandComponent,
    EditBrandComponent,
    BrandListComponent
  ],
    providers:[

    ]
})

export class BrandModule{

}