import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimetableComponent } from './components/content-page/timetable/timetable.component';

const routes: Routes = [
  {path:"timetable",component:TimetableComponent},
  {path:"**",component:TimetableComponent},
  {path:"",component:TimetableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
