import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication-service.service';
import { ContentService } from 'src/app/content-service.service';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css','./notice-board.component.scss']
})
export class NoticeBoardComponent implements OnInit {

  isParticularNoticePicked: boolean = false;
  noticePicked:any;

  listOfNotice:any;
  _isCR_authenticated:boolean = false;
  _isAddEditMode:boolean = false;
  _addEditTitle:string = 'Edit Notice';
  _activeNoticeForAddEdit:any;
  _activeState:number = 0;
  _noticeModel:any = null;
  
  constructor(private contentService:ContentService
            ,private _authService:AuthenticationService) 
  { 
       
  }

  ngOnInit(): void 
  {
    this._noticeModel = null;
    this._isCR_authenticated = this._authService._isCR_Aunthenticated;
    this._isAddEditMode = false;
    this.loadNotice();
  }

  loadNotice()
  {
      this.contentService.getNoticeBoardList().subscribe((resp)=>{
        console.log(resp);
        this.listOfNotice = resp;
        this.noticePicked = []; 
        this.noticePicked.push(this.listOfNotice[0]);
    });
  }

  noticeClicked(event:any)
  {
     console.log(event);
     this.noticePicked = []; 
     this.noticePicked.push(event);
  }

  openEditNoticePage(notice:any)
  {
      this._isAddEditMode = true;
      this._addEditTitle = 'Edit Notice'
      this._activeNoticeForAddEdit = notice;
      this._noticeModel = notice.text;
      this._activeState = 1;
  }

  openAddNoticePage()
  {
      this._isAddEditMode = true;
      this._addEditTitle = 'Add Notice'
      this._noticeModel = '';
      this._activeState = 2;
  }

  saveAndPost()
  {
       if(this._activeState==1)
       {
          this.editNotice();
       }
       else{
          this.createNotice();
       }
  }

  backToListPage()
  {
    this.loadNotice();
    this._isAddEditMode = false;
  }

  editNotice()
  {
      if(this._noticeModel==null || this._noticeModel==undefined || this._noticeModel.length==0 )
      {
          return;
      }

      let _body = {
        notice_id : this._activeNoticeForAddEdit.id,
        text : this._noticeModel
      }

      this.contentService.editNotice(_body).subscribe((resp)=>{
          this.loadNotice();
          this._isAddEditMode = false;
      })
  }

  createNotice()
  {
      if(this._noticeModel==null || this._noticeModel==undefined || this._noticeModel.length==0 )
      {
          return;
      }

      let _body = {
        student_id : this._authService.activeId,
        text : this._noticeModel
      }

      this.contentService.createNotice(_body).subscribe((resp)=>{
          this.loadNotice();
          this._isAddEditMode = false;
      })
  }

  deleteNotice(noticeId:any)
  {
       this.contentService.deleteNotice(noticeId).subscribe((resp)=>{
           this.loadNotice();
       })
  }


}
