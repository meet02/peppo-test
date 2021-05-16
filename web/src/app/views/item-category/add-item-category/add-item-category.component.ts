import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray, FormBuilder } from '@angular/forms';
import { HttpService } from "./../../../http.service"
import { config } from "./../../../config"
import { ErrorConstants } from "./../../../constants/error-constants"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";


@Component({
  selector: 'app-add-item-category',
  templateUrl: './add-item-category.component.html',
  styleUrls: ['./add-item-category.component.scss']
})
export class AddItemCategoryComponent implements OnInit {

  brandList
  submitted = false;
  itemCategorySrc
  addItemCategoryForm: FormGroup
  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private httpService: HttpService, private toaster: Toaster) { }


  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  ngOnInit(): void {

    this.httpService.getMethod(`${config.BASE_URL}brand/admin/get-brand`).subscribe((data: any) => {
      let result = data.data
      for (let x in result) {
        this.dropdownList.push({ item_id: result[x].brandId, item_text: result[x].title })
      }

      this.addItemCategoryForm = this.formBuilder.group({
        title: ["", Validators.required],
        description: ["", Validators.required],
        itemCategoryImage: [],

      })


      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
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

  submit() {
    this.submitted = true;
    if (this.addItemCategoryForm.valid) {
      let brandSting = []
      for (let x in this.brandList) {
        brandSting.push(this.brandList[x].item_id)
      }




      const formData = new FormData();
      formData.append('title', this.addItemCategoryForm.get('title').value);
      formData.append('description', this.addItemCategoryForm.get('description').value);
      formData.append('itemCategoryImage', this.addItemCategoryForm.get('itemCategoryImage').value);
      formData.append('brand', brandSting.join(","));

      this.httpService.postMethod(`${config.BASE_URL}item-category/create-item-category`, formData).subscribe((data) => {

        {
          this.toaster.open({
            text: ErrorConstants.DATA_SAVE_SUCCESS,
            caption: 'Success',
            type: "success"
          });
        }

        this.router.navigate(['../list'], { relativeTo: this.activeRoute })

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

  get f() { return this.addItemCategoryForm.controls; }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.itemCategorySrc = reader.result as string;

        this.addItemCategoryForm.patchValue({
          itemCategoryImage: file
        });

      };

    }
  }

  cancel() {
    this.router.navigate(['../list'], { relativeTo: this.activeRoute })
  }


  onItemSelect(item: any) {
    this.brandList.push(item)

  }
  onSelectAll(items: any) {
    this.brandList = items
  }
  onItemDeSelect(items: any) {
    this.brandList = items
  }


}
