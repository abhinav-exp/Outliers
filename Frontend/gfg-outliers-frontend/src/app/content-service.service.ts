/**
 * This Service is the main service of the application
 * 
 * It contains all the RESTful service endpoints for the CRUD operations
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
export class ContentService 
{
    setheaders() {
        return (
          new HttpHeaders()
            .set("Content-Type", "application/json")
        );
      }
    
      headerss = this.setheaders();

      constructor(private httpClient: HttpClient  //HttpClient injected into the ContentService
        ) { }

      //Thi method makes a GET request to get the List of students from the database.  
      getStudentsList()        //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/liststudents";
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      //This method takes student Id as a parameter
      //This method makes a GET request to get details of an individual student
      getProfileById(studentId:number)     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/get_by_id/"+studentId;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      /**This method takes an object containing details of the individual student
       * and makes a POST request to update the Profile details of student
      */
      updateProfile(_body:any)     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/edit_students";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      /**This method takes student Id as parameter
       * It makes a GET Request and 
       * returns the list of tasks for that student id for his/her To Do List
       */
      getTasksByStudentId(studentId:any)     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/get_task?student_id="+studentId;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      /** This method takes an object as parameter containing student Id, task details and deadline
       * It makes a POST request and
       * adds this task to the TO Do List of the student 
       */
      createTask(_body:any)     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/create_task";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      /**This API takes task Id as a parameter
       * It makes a GET request
       * It marks that task as completed
       */
      markTaskAsCompleted(taskId:any)     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/complete_task?task_id="+taskId;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      /**This method takes task Id as parameter 
       * It deletes that particular task
      */
      deleteTaskFromList(taskId:any)     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/delete_task?task_id="+taskId;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }


      /** This API takes studentId as parameter 
       *  It makes a GET request
       *  It lets all the current polls in database
      */
      listPolls(studentId:any)     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/list_poll?student_id="+studentId;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      /** This method takes an object
       *  It makes a POST request
       *  It creates a poll with given details in object 
      */ 
      createPoll(_body:any)     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/create_poll";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      /** This method takes vote, poll id and student Id 
       * It makes a GET Request
       * It marks the given vote of given student Id for goven poll id.
      */
      voteForPoll(vote:any, pollId:any,studentId:any)     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/vote?vote="+vote+"&student_id="+studentId+"&poll_id="+pollId;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      /** This method makes a GET request
       * It returns all notices from database
       */
      getNoticeBoardList()     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/listnotice";
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }

      /** This method takes an object as parameter 
       * It makes a POST request
       * It publishes a notice with given details
      */
      createNotice(_body:any)     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/create_notice";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      /** This method takes an object
       *  It makes a POST request
       *  It updates the notice with given notice ID
       */
      editNotice(_body:any)     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/edit_notice";
        console.log(url);
        return this.httpClient
        .post<any>(url,_body);
      }

      /** This method takes Notice Id as parameter
       * It deletes the notice with given notice ID
       */
      deleteNotice(noticeId:any)     //Returns an observable<any>
      {
        const url = "https://teamoutliers.herokuapp.com/api/delete_notice?notice_id="+noticeId;
        console.log(url);
        return this.httpClient
        .get<any>(url);
      }
 


}