import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication-service.service';
import { ContentService } from 'src/app/content-service.service';

@Component({
     selector: 'app-to-do-list',
     templateUrl: './to-do-list.component.html',
     styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

     //Hold the list of tasks
     todoList: any[] = [];

     //Holds the current selected task
     currentTask: any;

     //holds the display state of add task card
     _displayAddCard: boolean = false;

     //Holds today's date
     _minDateString: string = '';

     //Holds the loading state 
     _loading: boolean = false;


     constructor(private _contentService: ContentService,
          private _authenticationService: AuthenticationService,
          private _fb: FormBuilder) { }

     //Reactive form for task
     _taskForm: FormGroup = this._fb.group({
          text: [null, [Validators.required]],
          date: [null, [Validators.required]]
     })


     ngOnInit(): void {

          this._loading = false;
          this.setMinDate();
          //Populate the todo list
          this._contentService.getTasksByStudentId(this._authenticationService.activeId).subscribe((resp) => {
               this.todoList = [];
               for (let i = 0; i < resp.length; i++) {
                    this.todoList.push({
                         id: resp[i].id,
                         text: resp[i].text,
                         is_completed: resp[i].is_completed,
                         date: this.dateFormatterYYYYMMDD(resp[i].date)
                    })
               }
          })
     }

     //set min date to current date
     setMinDate()
     {
          let currentDate = new Date();
          this._minDateString = '';
          this._minDateString += String(currentDate.getFullYear());
          this._minDateString += "-";
          this._minDateString += this.dateFormatter2Digits(String(currentDate.getMonth() + 1));
          this._minDateString += "-";
          this._minDateString += this.dateFormatter2Digits(String(currentDate.getDate()));
     }

     //switch state of task clicked
     taskClicked(task: any) {
          this.currentTask = [];
          this.currentTask.push(task);
     }

     //Toggle diplay of add task card
     toggleTaskWindow(event: any) {
          this._taskForm.reset();
          if (this._displayAddCard) {
               this._displayAddCard = false;
          }
          else {
               this._displayAddCard = true;
          }
     }

     reloadToDOList() {
          this._contentService.getTasksByStudentId(this._authenticationService.activeId).subscribe((resp) => {
               // this.todoList = resp;
               this.todoList = [];
               for (let i = 0; i < resp.length; i++) {
                    this.todoList.push({
                         id: resp[i].id,
                         text: resp[i].text,
                         is_completed: resp[i].is_completed,
                         date: this.dateFormatterYYYYMMDD(resp[i].date)
                    })
               }
          })
     }

     //call base service for adding task for user
     addTaskForUser(event: any) {
          console.log(this._taskForm.value);
          //call base service only if form is valid
          if (this._taskForm.valid) {
               let _body = {
                    student_id: Number(this._authenticationService.activeId),
                    text: this._taskForm.value.text,
                    date: this.dateFormatterDDMMYYYY(this._taskForm.value.date)
               }
               this._loading = true;
               console.log(_body);
               this._contentService.createTask(_body).subscribe(
                    (resp) => {
                         this.reloadToDOList();
                         this._displayAddCard = false;
                         this._taskForm.reset();
                         this._loading = false;

                    },
                    (err) => {
                         alert('Coult Not Save Task')
                         this._loading = false;
                    }
               )
          }
     }

     //call base service to mark task as complete
     markTaskAsComplete(taskId: any) {
          this._contentService.markTaskAsCompleted(taskId).subscribe((resp) => {
               this.reloadToDOList();
          })
     }

     // call base service to delete task from list
     deleteTaskFromList(taskId: any) {
          this._contentService.deleteTaskFromList(taskId).subscribe((resp) => {
               this.reloadToDOList();
          })
     }

     //Utility function to change single digit number string to 2 digit number string
     dateFormatter2Digits(_str: string): String {
          if (Number(_str) < 10) {
               return '0' + _str;
          }
          return _str;

     }

     //Utility function to convert date sring to DD-MM-YYYY format
     dateFormatterDDMMYYYY(_date: string): String {
          let _formattedString = '';
          let _str = _date.split('-');
          _formattedString = _str[2] + '-' + _str[1] + '-' + _str[0];
          return _formattedString;
     }

     // Utility function to convert date sring to YYYY-MM-DD format
     dateFormatterYYYYMMDD(_date: string): String {
          let _formattedString = '';
          let _str = _date.split('-');
          _formattedString = _str[2] + '-' + _str[1] + '-' + _str[0];
          return _formattedString;
     }

}
