import { HttpEventType, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse ,HttpHeaders} from "@angular/common/http";
import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Observable,throwError} from "rxjs";
import {tap,catchError,retry} from "rxjs/operators";

import {Router,ActivatedRoute} from "@angular/router";


export class AuthInterceptorService implements HttpInterceptor{
    
    // constructor(private router:Router)
    // {

    // }
    intercept(req:HttpRequest<any>,next:HttpHandler)
    {
        let authReq = req;
        let token=localStorage.getItem('token')
        let userId=localStorage.getItem('userId')
        
        if(token!=null)
        {
            authReq=req.clone({headers: new HttpHeaders({
                'x-api-key':  userId,
                'authorization': token
              })})
        }
        return next.handle(authReq)
        // .pipe(tap((evt:any) => {
        //     console.log("evt",evt.body)
        //     if (evt instanceof HttpResponse) {
        //         if(evt.body && evt.body.success)
        //          { 
        //              console.log(evt.body.success)
        //              console.log(evt.body)
        //          }  
        //     }
        // }),)
        // .pipe(
        //     catchError((error: HttpErrorResponse) => {
        //       let errorMsg = '';
        //       if (error.error instanceof ErrorEvent) {
        //         console.log('this is client side error');
        //         errorMsg = `Error: ${error.error.message}`;
        //       }
        //       else {
                
        //         if(error.error.error.code==509 || error.error.error.code==405 || error.error.error.code==412)
        //         { 
        //             // this.router.navigate(['login'])
        //         }
                
        //       }

        //       return throwError(errorMsg);
        //     })
        //   )

    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ];