import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";


import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray, FormBuilder } from '@angular/forms';
import { HttpService } from "./../../../http.service"
import { config } from "./../../../config"
import { ErrorConstants } from "./../../../constants/error-constants"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";


@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {

  submitted = false;
  isChange = false
  brandImage
  editForm: FormGroup
  brandId
  brandSrc
  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private httpService: HttpService, private toaster: Toaster) { }


  ngOnInit(): void {

    this.activeRoute.params.subscribe((params) => {
      this.brandId = params["id"]
    })

    this.getData()
    this.editForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      brandImage: []
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

        this.brandSrc = reader.result as string;

        this.editForm.patchValue({
          brandImage: file
        });

      };

    }
  }


  getData = () => {
    this.httpService.getMethod(`${config.BASE_URL}brand/get-brand?brandId=${this.brandId}`).subscribe((data: any) => {

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
        this.brandSrc = data.data[0].brandImage
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

      const formData = new FormData();
      formData.append('title', this.editForm.get('title').value);
      formData.append('description', this.editForm.get('description').value);

      if (this.isChange) {
        formData.append('brandImage', this.editForm.get('brandImage').value);
      }

      formData.append('brandId', this.brandId);

      this.httpService.putMethod(`${config.BASE_URL}brand/update-brand`, formData).subscribe((data) => {

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





}
