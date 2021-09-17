import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { retry, catchError, map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class AuthenticationService
{
    setheaders() {
        return (
          new HttpHeaders()
            //.set('Authorization',null)//,'Bearer ' + this.token
            .set("Content-Type", "application/json")
        );
      }
    
      headerss = this.setheaders();

      constructor(
        private httpClient: HttpClient,
      ) { }

      activeId:any;

      

      authenticate_sign_up(_body:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/sign_up";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      authenticate_log_in(_body:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/log_in";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      


}