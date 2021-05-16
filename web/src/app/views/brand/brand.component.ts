import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from "@angular/router"
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { HttpService } from './../../http.service'
import { config } from "./../../config"
import { ErrorConstants } from "./../../constants/error-constants"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { pluck } from "underscore"

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})



export class BrandComponent implements OnInit {

  constructor() {

  }
  ngOnInit() {

  }

}

export interface Brand {
  title: string,
  description: string,
  brandImage: string
}