import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";


import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray, FormBuilder } from '@angular/forms';
import { HttpService } from "./../../../http.service"
import { config } from "./../../../config"
import { ErrorConstants } from "./../../../constants/error-constants"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-edit-item-category',
  templateUrl: './edit-item-category.component.html',
  styleUrls: ['./edit-item-category.component.scss']
})
export class EditItemCategoryComponent implements OnInit {

  submitted = false;
  isChange = false
  itemCategoryImage
  editForm: FormGroup
  itemCategoryId
  itemCategorySrc

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private httpService: HttpService, private toaster: Toaster) { }


  ngOnInit(): void {




    this.activeRoute.params.subscribe((params) => {
      this.itemCategoryId = params["id"]
    })

    this.httpService.getMethod(`${config.BASE_URL}brand/admin/get-brand`).subscribe((data: any) => {
      let result = data.data
      for (let x in result) {
        this.dropdownList.push({ item_id: result[x].brandId, item_text: result[x].title })
      }
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
      this.editForm = this.formBuilder.group({
        title: ["", Validators.required],
        description: ["", Validators.required],
        itemCategoryImage: [],
        brand: [this.selectedItems, null]
      })

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

  get f() { return this.editForm.controls; }

  onFileChange(event) {
    this.isChange = true
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.itemCategorySrc = reader.result as string;

        this.editForm.patchValue({
          itemCategoryImage: file
        });

      };

    }
  }


  getData = () => {
    this.httpService.getMethod(`${config.BASE_URL}item-category/get-item-category?itemCategoryId=${this.itemCategoryId}`).subscribe((data: any) => {
      console.log(data);
      if (Object.keys(data.data).length == 0) {
        this.toaster.open({
          text: ErrorConstants.ADMIN_DATA_NOT_FOUND,
          caption: 'Error',
          type: "danger"
        });
      }
      else {
        this.editForm.patchValue({
          title: data.data[0].title,
          description: data.data[0].description,

        })
        this.itemCategorySrc = data.data[0].itemCategoryImage

        for (let x of data.data[0].brand) {
          let i = this.dropdownList.findIndex(it => it.item_id == x)
          this.selectedItems.push({ item_id: this.dropdownList[i].item_id, item_text: this.dropdownList[i].item_text })
        }
        this.editForm.patchValue({
          title: data.data[0].title,
          description: data.data[0].description,
          brand: this.selectedItems
        })
        console.log("selectedItems", this.selectedItems)
      }
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

  cancel() {
    this.router.navigate(['../list'], { relativeTo: this.activeRoute })
  }

  submit() {

    this.submitted = true;
    if (this.editForm.valid) {
      let brandSting = []
      console.log("this.selectedItems", this.selectedItems)
      for (let x in this.selectedItems) {
        brandSting.push(this.selectedItems[x].item_id)
      }
      const formData = new FormData();
      formData.append('title', this.editForm.get('title').value);
      formData.append('description', this.editForm.get('description').value);

      if (this.isChange) {
        formData.append('itemCategoryImage', this.editForm.get('itemCategoryImage').value);
      }

      formData.append('itemCategoryId', this.itemCategoryId);
      formData.append('brand', brandSting.join(","));
      this.httpService.putMethod(`${config.BASE_URL}item-category/update-item-category`, formData).subscribe((data) => {

        {
          this.toaster.open({
            text: ErrorConstants.DATA_SAVE_SUCCESS,
            caption: 'Success',
            type: "success"
          });
        }

        this.router.navigate(['../../list'], { relativeTo: this.activeRoute })

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
    else {
      this.toaster.open({
        text: ErrorConstants.FORM_NOT_VALID,
        caption: 'Error',
        type: "danger"
      });
    }
  }

  onItemSelect(item: any) {
    // this.brandList.push(item)

  }
  onSelectAll(items: any) {
    // this.brandList = items
  }
  onItemDeSelect(items: any) {
    // this.brandList = items
  }

}
