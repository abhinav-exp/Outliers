import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/content-service.service';
// import { ContentService } from '../content-service.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  // holds the state of list page or profile page
  isParticularProfilePicked: boolean = false;

  // holds the partticular profile clicked
  profilePicked:any;

  // Holds the list of students 
  listOfStudents:any;

  // Holds if a student is picked
  studentPicked:any;
  
  constructor(private contentService:ContentService) 
  { 
       
  }


  ngOnInit(): void 
  {
       this.isParticularProfilePicked = false;
       //populate the list of students
       this.contentService.getStudentsList().subscribe((resp)=>{
           console.log(resp);
           this.listOfStudents = resp;
       })
  }

  //Toggle the particular profile screen
  profileClicked(event:any,student:any)
  {
      this.isParticularProfilePicked = true;
      console.log(event);
      console.log(student);
      this.studentPicked = [];
      this.studentPicked.push(student);
  }

  //back to list screen
  backClicked(event:any)
  {
      console.log("Button CLicked");
      this.isParticularProfilePicked = false;
  }

  //Utility function to format date fields
  indexFormatUtil(index:number)
  {
      if((index+1)<10)
      {
           return String("0")+String((index+1));
      }
      return String(index+1);
  }

}
