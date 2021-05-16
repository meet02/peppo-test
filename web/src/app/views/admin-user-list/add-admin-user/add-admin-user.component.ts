import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";


import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray, FormBuilder } from '@angular/forms';
import { HttpService } from "./../../../http.service"
import { config } from "./../../../config"
import { ErrorConstants } from "./../../../constants/error-constants"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: 'app-add-admin-user',
  templateUrl: './add-admin-user.component.html',
  styleUrls: ['./add-admin-user.component.scss']
})
export class AddAdminUserComponent implements OnInit {

  submitted = false;
  profilePhotoSrc
  addAdminForm: FormGroup
  constructor(private router: Router, private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private httpService: HttpService, private toaster: Toaster) { }


  ngOnInit(): void {

    this.addAdminForm = this.formBuilder.group({
      userName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      profilePhoto: []
    })
  }

  get f() { return this.addAdminForm.controls; }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.profilePhotoSrc = reader.result as string;

        this.addAdminForm.patchValue({
          profilePhoto: file
        });

      };

    }
  }

  cancel() {
    this.router.navigate(['../list'], { relativeTo: this.activeRoute })
  }

  submit() {

    this.submitted = true;
    if (this.addAdminForm.valid) {

      const formData = new FormData();
      formData.append('userName', this.addAdminForm.get('userName').value);
      formData.append('email', this.addAdminForm.get('email').value);
      formData.append('password', this.addAdminForm.get('password').value);
      formData.append('profilePhoto', this.addAdminForm.get('profilePhoto').value);

      this.httpService.postMethod(`${config.BASE_URL}admin/create-admin-user`, formData).subscribe((data) => {

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


}
