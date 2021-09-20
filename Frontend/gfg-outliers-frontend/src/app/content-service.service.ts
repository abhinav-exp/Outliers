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

      getTasksByStudentId(studentId:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/get_task?student_id="+studentId;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      createTask(_body:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/create_task";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      markTaskAsCompleted(studentId:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/complete_task?task_id="+studentId;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      deleteTaskFromList(studentId:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/delete_task?task_id="+studentId;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }


      listPolls(studentId:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/list_poll?student_id="+studentId;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      createPoll(_body:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/create_poll";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      voteForPoll(vote:any, pollId:any,studentId:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/vote?vote="+vote+"&student_id="+studentId+"&poll_id="+pollId;
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

      createNotice(_body:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/create_notice";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      editNotice(_body:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/edit_notice";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      deleteNotice(noticeId:any)
      {
        const url = "https://teamoutliers.herokuapp.com/api/delete_notice?notice_id="+noticeId;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }
 


}