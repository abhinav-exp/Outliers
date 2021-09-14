import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  todoList:any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.todoList.push({
        task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        deadline:new Date()
    });
    this.todoList.push({
        task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        deadline:new Date()
    });
    this.todoList.push({
        task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        deadline:new Date()
    });
    this.todoList.push({
        task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        deadline:new Date()
    });
    this.todoList.push({
        task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        deadline:new Date()
    });
    this.todoList.push({
        task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        deadline:new Date()
    });
    this.todoList.push({
        task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        deadline:new Date()
    });
    this.todoList.push({
        task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        deadline:new Date()
    });
    this.todoList.push({
        task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        deadline:new Date()
    });
    this.todoList.push({
        task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        deadline:new Date()
    });
    this.todoList.push({
        task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        deadline:new Date()
    });

    this.currentTask = [];
    this.currentTask.push({
        task:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        deadline:new Date()
    });
  }

  currentTask:any;
  taskClicked(task:any)
  {
      this.currentTask = [];
      this.currentTask.push(task);
  }

}
