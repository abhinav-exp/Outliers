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

  todoList:any[] = [];
  constructor(private _contentService:ContentService,
              private _authenticationService:AuthenticationService,
              private _fb:FormBuilder) { }

  _displayAddCard:boolean = false;
  _taskForm:FormGroup = this._fb.group({
      text: [null,[Validators.required]],
      date: [null,[Validators.required]]
  })

  _minDateString:string = '';
  _loading:boolean = false;

  ngOnInit(): void {
      
    // this.currentTask = [];
    // this.currentTask.push({
    //     task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //     deadline:new Date()
    // });
    this._loading = false;
    let currentDate = new Date();
    this._minDateString = '';
    this._minDateString+=String(currentDate.getFullYear());
    this._minDateString+="-";
    this._minDateString+=this.dateFormatter2Digits(String(currentDate.getMonth()+1));
    this._minDateString+="-";
    this._minDateString+=this.dateFormatter2Digits(String(currentDate.getDate()));
    console.log(this._minDateString);
    this._contentService.getTasksByStudentId(this._authenticationService.activeId).subscribe((resp)=>{
        this.todoList = [];
        for(let i=0;i<resp.length;i++)
        {
             this.todoList.push({
                id: resp[i].id,
                text: resp[i].text,
                is_completed: resp[i].is_completed,
                date: this.dateFormatterYYYYMMDD(resp[i].date)
             })
        }
        // this.todoList = resp;
    })
  }

  currentTask:any;
  taskClicked(task:any)
  {
      this.currentTask = [];
      this.currentTask.push(task);
  }

  toggleTaskWindow(event:any)
  { 
       this._taskForm.reset();
       if(this._displayAddCard)
       {
            this._displayAddCard = false;
       }
       else
       {
            this._displayAddCard = true;
       }
  }

  reloadToDOList()
  {
    this._contentService.getTasksByStudentId(this._authenticationService.activeId).subscribe((resp)=>{
        // this.todoList = resp;
        this.todoList = [];
        for(let i=0;i<resp.length;i++)
        {
             this.todoList.push({
                id: resp[i].id,
                text: resp[i].text,
                is_completed: resp[i].is_completed,
                date: this.dateFormatterYYYYMMDD(resp[i].date)
             })
        }
    })
  }

  addTaskForUser(event:any)
  {
       console.log(this._taskForm.value);
       if(this._taskForm.valid)
       {
            let _body = {
                student_id:Number(this._authenticationService.activeId),
                text: this._taskForm.value.text,
                date: this.dateFormatterDDMMYYYY(this._taskForm.value.date)
            }
            this._loading = true;
            console.log(_body);
            this._contentService.createTask(_body).subscribe(
                (resp)=>{
                    this.reloadToDOList();
                    this._displayAddCard = false;
                    this._taskForm.reset();
                    this._loading = false;
                    
                },
                (err)=>{
                    alert('Coult Not Save Task')
                    this._loading = false;
                }
            )
       }
  }

  markTaskAsComplete(taskId:any)
  {
       this._contentService.markTaskAsCompleted(taskId).subscribe((resp)=>{
           this.reloadToDOList();
       })
  }

  deleteTaskFromList(taskId:any)
  {
       this._contentService.deleteTaskFromList(taskId).subscribe((resp)=>{
           this.reloadToDOList();
       })
  }

  dateFormatter2Digits(_str:string):String
  {
       if(Number(_str)<10)
       {
            return '0'+_str;
       }
       return _str;

  }

  dateFormatterDDMMYYYY(_date:string):String
  {
       let _formattedString = '';
       let _str = _date.split('-');
       _formattedString = _str[2]+'-'+_str[1]+'-'+_str[0];
       return _formattedString;
  }
  
  dateFormatterYYYYMMDD(_date:string):String
  {
       let _formattedString = '';
       let _str = _date.split('-');
       _formattedString = _str[2]+'-'+_str[1]+'-'+_str[0];
       return _formattedString;
  }

}
