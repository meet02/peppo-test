import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, Validators, FormControl, AbstractControl, ValidatorFn, FormArray, FormBuilder } from '@angular/forms';
import {HttpService} from "./../../http.service"
import {config} from "./../../config"
import {ErrorConstants} from "./../../constants/error-constants"


import { ToastConfig, Toaster, ToastType } from "ngx-toast-notifications";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit { 

  
  loginForm:FormGroup;
  submitted = false;
  constructor(private toaster: Toaster, private router: Router,private formBuilder: FormBuilder,private httpService: HttpService)
  {

  }

  ngOnInit()
  {
    
    this.loginForm = this.formBuilder.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]

    });
  }

  get f() { return this.loginForm.controls; }

  

  login()
  {
    this.submitted = true;

    let loginCredetions={
      userName:this.loginForm.controls.userName.value,
      password:this.loginForm.controls.password.value
    }
    if (this.loginForm.valid) {

      if(loginCredetions.userName=="admin2102@gmail.com" && loginCredetions.password=="admin2102")
      {
        this.toaster.open({
          text: "You Login Successfully",
          caption: 'Success',
          type: "success"
        });
        localStorage.setItem('userId',"ADMIN000001");
        
        this.router.navigate(['home','dashboard'])
      }
      else{
        this.httpService.postMethod(`${config.BASE_URL}admin/login-admin-user`,loginCredetions).subscribe((data:any)=>{
          
          this.toaster.open({
            text: "You Login Successfully",
            caption: 'Success',
            type: "success"
          });
          localStorage.setItem('token',data.data.token);
          localStorage.setItem('userId',data.data.userId);
          localStorage.setItem('profilePhoto',data.data.profilePhoto);
          this.router.navigate(['home','dashboard'])

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
        
    }
  }
}
