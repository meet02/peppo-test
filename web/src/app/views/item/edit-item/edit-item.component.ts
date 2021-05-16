import { Component, OnInit } from '@angular/core';


import { Router, ActivatedRoute } from "@angular/router";


import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray, FormBuilder } from '@angular/forms';
import { HttpService } from "./../../../http.service"
import { config } from "./../../../config"
import { ErrorConstants } from "./../../../constants/error-constants"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {


  submitted = false;
  isChange = false
  itemSrc
  itemId
  itemImage
  editForm: FormGroup
  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private httpService: HttpService, private toaster: Toaster) { }


  dropdownListItemCategory = [];
  selectedItemsItemCategory = [];
  dropdownSettingsItemCategory: IDropdownSettings;


  dropdownListBrand = [];
  selectedItemsBrand = [];
  dropdownSettingsBrand: IDropdownSettings;

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params) => {
      this.itemId = params["id"]
    })

    this.dropdownSettingsBrand = {
      singleSelection: true,
      idField: 'brandId',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


    this.httpService.getMethod(`${config.BASE_URL}item/get-item?itemId=${this.itemId}`).subscribe((itemData: any) => {
      itemData = itemData.data[0];

      this.httpService.getMethod(`${config.BASE_URL}item-category/get-active-item-category`).subscribe((data: any) => {

        let itemCategoryList = data.data;



        for (let x in data.data) {
          this.dropdownListItemCategory.push({ itemCategoryId: data.data[x].itemCategoryId, title: data.data[x].title })
        }

        let index = this.dropdownListItemCategory.findIndex(data => data.itemCategoryId == itemData.itemCategoryId)
        if (index > -1) {
          this.selectedItemsItemCategory = [{ itemCategoryId: this.dropdownListItemCategory[index].itemCategoryId, title: this.dropdownListItemCategory[index].title }]

        }



        this.editForm = this.formBuilder.group({
          title: [itemData.title, Validators.required],
          description: [itemData.description, Validators.required],
          availableQuantity: ["", Validators.required],
          cushions: ["", null],
          ingredients: ["", null],
          itemCategoryId: [[], null],
          brand: [[], null],
          itemImage: [],
        })

        this.editForm.patchValue({
          title: itemData.title,
          description: itemData.description,
          availableQuantity: itemData.availableQuantity,
          cushions: itemData.cushions,
          ingredients: itemData.ingredients,
          itemCategoryId: itemData.itemCategoryId,
          brand: itemData.brand,
          itemImage: itemData.itemImage
        })
        this.itemSrc = itemData.itemImage

        this.dropdownSettingsItemCategory = {
          singleSelection: true,
          idField: 'itemCategoryId',
          textField: 'title',
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
    if (this.editForm.valid) {
      let brandSting = []
      for (let x in this.selectedItemsBrand) {
        brandSting.push(this.selectedItemsBrand[x].brandId)
      }

      let itemSting = []
      for (let x in this.selectedItemsItemCategory) {
        itemSting.push(this.selectedItemsItemCategory[x].itemCategoryId)
      }






      const formData = new FormData();
      formData.append('title', this.editForm.get('title').value);
      formData.append('description', this.editForm.get('description').value);
      formData.append('cushions', this.editForm.get('cushions').value);
      formData.append('ingredients', this.editForm.get('ingredients').value);
      formData.append('availableQuantity', this.editForm.get('availableQuantity').value);
      if (this.isChange) {
        formData.append('itemImage', this.editForm.get('itemImage').value);
      }

      formData.append('brand', brandSting.join(","));
      formData.append('itemCategoryId', this.selectedItemsItemCategory[0].itemCategoryId);
      formData.append('itemId', this.itemId);

      this.httpService.putMethod(`${config.BASE_URL}item/update-item`, formData).subscribe((data) => {

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

  get f() { return this.editForm.controls; }




  onFileChange(event) {
    this.isChange = true
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.itemSrc = reader.result as string;

        this.editForm.patchValue({
          itemImage: file
        });

      };

    }
  }

  cancel() {
    this.router.navigate(['../list'], { relativeTo: this.activeRoute })
  }

  onItemSelectItemCategory(item: any) {

    let itemCategoryId = item.itemCategoryId

    this.httpService.getMethod(`${config.BASE_URL}brand/get-brand-list-by-category?itemCategoryId=${itemCategoryId}`).subscribe((data: any) => {


      let brandList = []
      for (let x in data.data) {
        brandList.push({ brandId: data.data[x].brandId, title: data.data[x].title })

      }
      this.dropdownListBrand = brandList

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
  onSelectAllBand(items: any) {
    if (Object.keys(this.selectedItemsItemCategory).length == 0) {
      this.toaster.open({
        text: ErrorConstants.PLEASE_SELECT_ITEM_CATEGORY,
        caption: 'Warning',
        type: "warning"
      });
    }
  }
  onItemDeSelectBrand(items: any) {
    if (Object.keys(this.selectedItemsItemCategory).length == 0) {
      this.toaster.open({
        text: ErrorConstants.PLEASE_SELECT_ITEM_CATEGORY,
        caption: 'Warning',
        type: "warning"
      });
    }
  }

  onItemSelectBrand() {
    if (Object.keys(this.selectedItemsItemCategory).length == 0) {
      this.toaster.open({
        text: ErrorConstants.PLEASE_SELECT_ITEM_CATEGORY,
        caption: 'Warning',
        type: "warning"
      });
    }
  }


}
