import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeBoardComponent } from './components/content-page/notice-board/notice-board.component';
import { ProfileComponent } from './components/content-page/profile/profile.component';
import { StudentListComponent } from './components/content-page/student-list/student-list.component';
import { TimetableComponent } from './components/content-page/timetable/timetable.component';
import { ToDoListComponent } from './components/content-page/to-do-list/to-do-list.component';

const routes: Routes = [
  {path:"todo",component:ToDoListComponent},
  {path:"profile",component:ProfileComponent},
  {path:"students",component:StudentListComponent},
  {path:"notice-board",component:NoticeBoardComponent},
  {path:"timetable",component:TimetableComponent},
  {path:"**",component:TimetableComponent},
  {path:"",component:TimetableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
