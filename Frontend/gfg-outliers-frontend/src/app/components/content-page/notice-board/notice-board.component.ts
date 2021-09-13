import { Component, OnInit } from '@angular/core';
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
  
  constructor(private contentService:ContentService) 
  { 
       
  }

  ngOnInit(): void 
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

}
