import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication-service.service';
import { ContentService } from 'src/app/content-service.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {

  constructor(private _authService:AuthenticationService
             ,private _contentService:ContentService) { }

  //Holds the list of polls           
  _polls:any;

  //Ng Model for poll input text
  _createPollInput:any;

  //Stores loading state 
  _isCreatePollLoading:boolean = false;

  ngOnInit(): void 
  {
      this._createPollInput = null;
      this._isCreatePollLoading = false;
      this._polls = [];
      this.loadPolls();
  }

  //Populates the list of polls
  loadPolls()
  {
      this._contentService.listPolls(this._authService.activeId).subscribe((resp)=>{
          this._polls = resp;
      })
  }

  //Vote for a particular poll
  voteForPoll(poll:any,vote:any)
  {
      console.log("vote= "+vote);
      console.log("stId="+this._authService.activeId);
      console.log("pollId="+poll.id);
      this._contentService.voteForPoll(vote,poll.id,this._authService.activeId).subscribe((resp)=>{
          this.loadPolls();
      })
  }

  _createPoll()
  {
      // If ng model meets any of these conditions then don't call the base service
      if(this._createPollInput==null || this._createPollInput==undefined || this._createPollInput.length==0)
      {
         return;
      }
      let _body = {
        text : this._createPollInput,
        student_id : Number(this._authService.activeId)
      }
      this._isCreatePollLoading = true;
      this._contentService.createPoll(_body).subscribe((resp)=>{
          this.loadPolls();
          this._createPollInput = null;
          this._isCreatePollLoading = false;
      })
  }
}
