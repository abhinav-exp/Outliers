import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication-service.service';
import { ContentService } from 'src/app/content-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileFormData:FormGroup = this._fb.group({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    state: '',
    city: ''
 });

 _currentProfile:any;

 constructor(private _fb:FormBuilder
            ,private authenticationService:AuthenticationService
            ,private _contentService:ContentService) { }
 
  
 ngOnInit(): void 
 {
     console.log("Active Id : "+this.authenticationService.activeId);
     this.getProfileById(this.authenticationService.activeId);
 }

  getProfileById(activeId: any) 
  {
      this._contentService.getProfileById(activeId).subscribe((response)=>{
           this._currentProfile = response;
           this.profileFormData.setValue({
            firstName: response.first,
            lastName: response.last,
            phoneNumber: response.contact,
            address: response.address,
            state: response.state,
            city: response.city
           })
      })    
  }

 

}
