import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticeBoardComponent } from './components/content-page/notice-board/notice-board.component';
import { StudentListComponent } from './components/content-page/student-list/student-list.component';
import { TimetableComponent } from './components/content-page/timetable/timetable.component';

const routes: Routes = [
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
