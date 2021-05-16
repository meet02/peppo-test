import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private httpHeaders: HttpHandler, private router: Router) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {

      if (error.status == 509 || error.status == 405 || error.status == 412) {
        this.router.navigate(['login'])
      }
      // Server-side errors

    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }


  getMethod(url) {
    // const options = { params: new HttpParams({fromString:queryString }) };
    return this.http.get(url).pipe(retry(1), catchError(this.handleError))
  }

  postMethod(url, body) {
    return this.http.post(url, body).pipe(retry(1), catchError(this.handleError))
  }

  putMethod(url, body) {
    return this.http.put(url, body).pipe(retry(1), catchError(this.handleError))
  }

  deleteMEthod(url, body) {
    return this.http.delete(url, body).pipe(retry(1), catchError(this.handleError))
  }



}
