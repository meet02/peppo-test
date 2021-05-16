import { Component, OnInit } from '@angular/core';

import {Router,ActivatedRoute} from "@angular/router";


import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray, FormBuilder } from '@angular/forms';
import {HttpService} from "./../../../http.service"
import {config} from "./../../../config"
import {ErrorConstants} from "./../../../constants/error-constants"
import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: 'app-edit-admin-user',
  templateUrl: './edit-admin-user.component.html',
  styleUrls: ['./edit-admin-user.component.scss']
})
export class EditAdminUserComponent implements OnInit {

  submitted=false;
  isChange=false
  profilePhotoSrc
  editAdminForm:FormGroup
  userId
  constructor(private router: Router,private activeRoute:ActivatedRoute,
    private formBuilder:FormBuilder,private httpService: HttpService,private toaster:Toaster) { }
  

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params)=>{
      this.userId=params["id"]
    })

    this.getData()
    this.editAdminForm=this.formBuilder.group({
      userName:["",Validators.required],
      email:["",Validators.required],
      password:[""],
      profilePhoto:[]
    })
  }

  get f() { return this.editAdminForm.controls; }

  onFileChange(event)
  {
    this.isChange=true
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.profilePhotoSrc = reader.result as string;
     
        this.editAdminForm.patchValue({
          profilePhoto: file
        });
   
      };
   
    }
  }


  getData=()=>{
    this.httpService.getMethod(`${config.BASE_URL}admin/get-admin-user?userId=${this.userId}`).subscribe((data:any)=>{
        console.log(data);  
      if(Object.keys(data.data).length==0){
          this.toaster.open({
            text: ErrorConstants.ADMIN_DATA_NOT_FOUND,
            caption: 'Error',
            type: "danger"
          });
        }
        else{
          this.editAdminForm.patchValue({
            userName:data.data[0].userName,
            email:data.data[0].email,
            
          })
          this.profilePhotoSrc=data.data[0].profilePhoto
        }
    },(err)=>{
      if(err.error.error.message)
      {
        this.toaster.open({
          text: err.error.error.message,
          caption: 'Error',
          type: "danger"
        });
      }
      else{
        this.toaster.open({
          text: ErrorConstants.INTERNAL_SERVER_ERROR,
          caption: 'Error',
          type: "danger"
        });
      }
    })
  }

  cancel()
  {
    this.router.navigate(['../list'],{relativeTo:this.activeRoute})
  }

  submit()
  {
    console.log("submitcall")
    this.submitted = true;
    if(this.editAdminForm.valid) {

      const formData = new FormData();
      formData.append('userName', this.editAdminForm.get('userName').value);
      formData.append('email', this.editAdminForm.get('email').value);
      if(this.editAdminForm.get('password').value)
      {
        formData.append('password', this.editAdminForm.get('password').value);
      }
      if(this.isChange)
      {
        formData.append('profilePhoto', this.editAdminForm.get('profilePhoto').value);
      }
      
      formData.append('userId', this.userId);
      
      this.httpService.putMethod(`${config.BASE_URL}admin/update-admin-user`, formData).subscribe((data)=>{

        {
          this.toaster.open({
            text: ErrorConstants.DATA_SAVE_SUCCESS,
            caption: 'Success',
            type: "success"
          });
        }

        this.router.navigate(['../../list'], {relativeTo:this.activeRoute})

      },(err)=>{
        if(err.error.error.message)
          {
            this.toaster.open({
              text: err.error.error.message,
              caption: 'Error',
              type: "danger"
            });
          }
          else{
            this.toaster.open({
              text: ErrorConstants.INTERNAL_SERVER_ERROR,
              caption: 'Error',
              type: "danger"
            });
          }
      })
    }
    else{
      this.toaster.open({
        text: ErrorConstants.FORM_NOT_VALID,
        caption: 'Error',
        type: "danger"
      });
    }
  }




}
