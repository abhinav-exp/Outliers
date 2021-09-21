import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication-service.service';
import { ContentService } from 'src/app/content-service.service';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css','./notice-board.component.scss']
})
export class NoticeBoardComponent implements OnInit {

  //Maintains state of list page or single notice page
  isParticularNoticePicked: boolean = false;

  //Stores the notice object when particular notice selected
  noticePicked:any;

  //Contains the list of notice
  listOfNotice:any;

  //Maintains the authentication of class representative 
  _isCR_authenticated:boolean = false;

  //Maintains state of add/edit page 
  _isAddEditMode:boolean = false;

  //maintains state of add/edit page title
  _addEditTitle:string = 'Edit Notice';

  //stores notice object for add/edit page
  _activeNoticeForAddEdit:any;

  //Stores if it is add mode or edit mode
  _activeState:number = 0;

  //Ng Model for notice text
  _noticeModel:any = null;
  
  constructor(private contentService:ContentService                   //Content Setvice injected
            ,private _authService:AuthenticationService              // Auth Service injected
  ) { }

  ngOnInit(): void 
  {
    this._noticeModel = null;
    this._isCR_authenticated = this._authService._isCR_Aunthenticated;
    this._isAddEditMode = false;
    this.loadNotice();
  }

  // Call for the list of notices
  loadNotice()
  {
      this.contentService.getNoticeBoardList().subscribe((resp)=>{
        console.log(resp);
        this.listOfNotice = resp;
        this.noticePicked = []; 
        this.noticePicked.push(this.listOfNotice[0]);
    });
  }

  //changes state of noticePicked 
  noticeClicked(event:any)
  {
     console.log(event);
     this.noticePicked = []; 
     this.noticePicked.push(event);
  }

  //Toggles the edit notice page
  openEditNoticePage(notice:any)
  {
      this._isAddEditMode = true;
      this._addEditTitle = 'Edit Notice'
      this._activeNoticeForAddEdit = notice;
      this._noticeModel = notice.text;
      this._activeState = 1;
  }

  //Toggles the add notice page
  openAddNoticePage()
  {
      this._isAddEditMode = true;
      this._addEditTitle = 'Add Notice'
      this._noticeModel = '';
      this._activeState = 2;
  }

  //Saving and Posting after add/edit
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

  //cancels adding or editing of notice
  backToListPage()
  {
    this.loadNotice();
    this._isAddEditMode = false;
  }

  editNotice()
  {
      // If ng model meets any condition then don't call the base service
      if(this._noticeModel==null || this._noticeModel==undefined || this._noticeModel.length==0 )
      {
          return;
      }

      let _body = {
        notice_id : this._activeNoticeForAddEdit.id,
        text : this._noticeModel
      }
      //calling service method for edit notice
      this.contentService.editNotice(_body).subscribe((resp)=>{
          this.loadNotice();
          this._isAddEditMode = false;
      })
  }

  createNotice()
  {
      // If ng model meets any condition then don't call the base service
      if(this._noticeModel==null || this._noticeModel==undefined || this._noticeModel.length==0 )
      {
          return;
      }

      let _body = {
        student_id : this._authService.activeId,
        text : this._noticeModel
      }
      //calling service method for save notice
      this.contentService.createNotice(_body).subscribe((resp)=>{
          this.loadNotice();
          this._isAddEditMode = false;
      })
  }

  deleteNotice(noticeId:any)
  {
      //calling service method for delete notice
       this.contentService.deleteNotice(noticeId).subscribe((resp)=>{
           this.loadNotice();
       })
  }


}
