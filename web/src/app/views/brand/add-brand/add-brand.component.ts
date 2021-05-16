import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";


import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray, FormBuilder } from '@angular/forms';
import { HttpService } from "./../../../http.service"
import { config } from "./../../../config"
import { ErrorConstants } from "./../../../constants/error-constants"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {


  submitted = false;
  brandSrc
  addBrand: FormGroup
  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private httpService: HttpService, private toaster: Toaster) { }


  ngOnInit(): void {

    this.addBrand = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      brandImage: []
    })
  }

  submit() {
    this.submitted = true;
    if (this.addBrand.valid) {

      const formData = new FormData();
      formData.append('title', this.addBrand.get('title').value);
      formData.append('description', this.addBrand.get('description').value);
      formData.append('brandImage', this.addBrand.get('brandImage').value);

      this.httpService.postMethod(`${config.BASE_URL}brand/create-brand`, formData).subscribe((data) => {

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

  get f() { return this.addBrand.controls; }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.brandSrc = reader.result as string;

        this.addBrand.patchValue({
          brandImage: file
        });

      };

    }
  }

  cancel() {
    this.router.navigate(['../list'], { relativeTo: this.activeRoute })
  }

}
