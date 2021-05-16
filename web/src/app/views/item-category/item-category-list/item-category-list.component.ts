import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from "@angular/router"
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { HttpService } from './../../../http.service'
import { config } from "./../../../config"
import { ErrorConstants } from "./../../../constants/error-constants"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { pluck } from "underscore"

@Component({
  selector: 'app-item-category-list',
  templateUrl: './item-category-list.component.html',
  styleUrls: ['./item-category-list.component.scss']
})
export class ItemCategoryListComponent implements OnInit {

  displayedColumns: string[] = ['select', 'itemCategoryId', 'title', 'description', 'status', 'itemCategoryImage'];
  dataSource: MatTableDataSource<ItemCategory>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<ItemCategory>(true, []);
  constructor(private toaster: Toaster, private httpService: HttpService, private router: Router, private activeRoute: ActivatedRoute) {


  }



  ngOnInit(): void {
    this.getData()
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;

    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {

    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


  active() {
    if (Object.keys(this.selection.selected).length == 0) {
      this.toaster.open({
        text: ErrorConstants.PLEASE_SELECT_ROW,
        caption: 'Warning',
        type: "warning"
      });
    }
    else {
      let selectedRow = pluck(this.selection.selected, "itemCategoryId")
      let body = {
        ids: selectedRow.toString()
      }
      this.httpService.putMethod(`${config.BASE_URL}item-category/active-item-category`, body).subscribe((data) => {
        this.toaster.open({
          text: ErrorConstants.DATA_UPDATED_SUCCESS,
          caption: 'Sucess',
          type: "success"
        });
        this.selection.clear()
        this.getData()
      }, (err) => {
        if (err.error.error.message) {
          this.toaster.open({
            text: err.error.error.message,
            caption: 'Error',
            type: "danger"
          });
        }
        else {
          this.toaster.open({
            text: ErrorConstants.INTERNAL_SERVER_ERROR,
            caption: 'Error',
            type: "danger"
          });
        }
      })
    }
  }



  delete() {
    if (Object.keys(this.selection.selected).length == 0) {
      this.toaster.open({
        text: ErrorConstants.PLEASE_SELECT_ROW,
        caption: 'Warning',
        type: "warning"
      });
    }
    else {
      let selectedRow = pluck(this.selection.selected, "itemCategoryId")
      let body = {
        ids: selectedRow.toString()
      }
      this.httpService.putMethod(`${config.BASE_URL}item-category/delete-item-category`, body).subscribe((data) => {
        this.toaster.open({
          text: ErrorConstants.DATA_UPDATED_SUCCESS,
          caption: 'Sucess',
          type: "success"
        });
        this.selection.clear()
        this.getData()
      }, (err) => {
        if (err.error.error.message) {
          this.toaster.open({
            text: err.error.error.message,
            caption: 'Error',
            type: "danger"
          });
        }
        else {
          this.toaster.open({
            text: ErrorConstants.INTERNAL_SERVER_ERROR,
            caption: 'Error',
            type: "danger"
          });
        }
      })
    }
  }

  inactive() {
    if (Object.keys(this.selection.selected).length == 0) {
      this.toaster.open({
        text: ErrorConstants.PLEASE_SELECT_ROW,
        caption: 'Warning',
        type: "warning"
      });
    }
    else {
      let selectedRow = pluck(this.selection.selected, "itemCategoryId")
      let body = {
        ids: selectedRow.toString()
      }
      this.httpService.putMethod(`${config.BASE_URL}item-category/inactive-item-category`, body).subscribe((data) => {
        this.toaster.open({
          text: ErrorConstants.DATA_UPDATED_SUCCESS,
          caption: 'Sucess',
          type: "success"
        });
        this.selection.clear()
        this.getData()
      }, (err) => {
        if (err.error.error.message) {
          this.toaster.open({
            text: err.error.error.message,
            caption: 'Error',
            type: "danger"
          });
        }
        else {
          this.toaster.open({
            text: ErrorConstants.INTERNAL_SERVER_ERROR,
            caption: 'Error',
            type: "danger"
          });
        }
      })
    }
  }

  add() {
    this.router.navigate(['../add'], { relativeTo: this.activeRoute })
  }

  ngAfterViewInit() {

  }

  getData = () => {
    this.httpService.getMethod(`${config.BASE_URL}item-category/get-item-category`).subscribe((data: any) => {

      const ELEMENT_DATA: ItemCategory[] = data.data
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, (err) => {
      if (err.error.error.message) {
        this.toaster.open({
          text: err.error.error.message,
          caption: 'Error',
          type: "danger"
        });
      }
      else {
        this.toaster.open({
          text: ErrorConstants.INTERNAL_SERVER_ERROR,
          caption: 'Error',
          type: "danger"
        });
      }
    })

  }



}

export interface ItemCategory {
  itemCategoryId: string,
  title: string,
  description: string,
  brand: string,
  itemCategoryImage: string,
  status: string,


}
