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
export class ContentService 
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

      getStudentsList()
      {
        const url = "https://teamoutliers.herokuapp.com/api/liststudents";
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      getNoticeBoardList()
      {
        const url = "https://teamoutliers.herokuapp.com/api/listnotice";
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      getProfileById(id:number)
      {
        const url = "https://teamoutliers.herokuapp.com/api/get_by_id/"+id;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      updateProfile(_body:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/edit_students";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }
 


}