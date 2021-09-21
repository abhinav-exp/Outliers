/**
 * This Service deals with Authentication
 * 
 * Login/SignUp
 */
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

      /** This variable maintains the student Id of current logged in student */
      activeId:any;
      /** This variable maintains the state of current student being Class Representative or not */
      _isCR_Aunthenticated:boolean=false;

      constructor(
        private httpClient: HttpClient,
      ) 
      {
          this._isCR_Aunthenticated = false;
      }

      /**
       * This method takes cretendials in form of an object
       * 
       * It returns the result as an observable
       */
      authenticate_sign_up(_body:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/sign_up";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      /**
       * This method takes cretendials in form of an object
       * 
       * It returns the result as an observable
       */
      authenticate_log_in(_body:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/log_in";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      


}