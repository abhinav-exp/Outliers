import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/content-service.service';
// import { ContentService } from '../content-service.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  isParticularProfilePicked: boolean = false;
  profilePicked:any;
  
  constructor(private contentService:ContentService) 
  { 
       
  }

  listOfStudents:any;
  studentPicked:any;

  ngOnInit(): void 
  {
       this.isParticularProfilePicked = false;
       this.contentService.getStudentsList().subscribe((resp)=>{
           console.log(resp);
           this.listOfStudents = resp;
       })
  }

  profileClicked(event:any,student:any)
  {
      this.isParticularProfilePicked = true;
      console.log(event);
      console.log(student);
      this.studentPicked = [];
      this.studentPicked.push(student);
  }

  backClicked(event:any)
  {
      console.log("Button CLicked");
      this.isParticularProfilePicked = false;
  }

  indexFormatUtil(index:number)
  {
      if((index+1)<10)
      {
           return String("0")+String((index+1));
      }
      return String(index+1);
  }

}
