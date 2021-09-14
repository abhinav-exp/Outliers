import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { TimetableComponent } from './components/content-page/timetable/timetable.component';
import { StudentListComponent } from './components/content-page/student-list/student-list.component';
import { NoticeBoardComponent } from './components/content-page/notice-board/notice-board.component';
import { ContentService } from './content-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/content-page/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    MainContentComponent,
    TimetableComponent,
    StudentListComponent,
    NoticeBoardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
