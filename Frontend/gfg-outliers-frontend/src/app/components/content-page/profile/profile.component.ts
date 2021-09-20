import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication-service.service';
import { ContentService } from 'src/app/content-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileFormData: FormGroup = this._fb.group({
    firstName: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    phoneNumber: ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
    address: ['',[Validators.required]],
    state: ['',[Validators.required]],
    city: ['',[Validators.required]],
    achievement1: '',
    achievement2: '',
    achievement3: '',
    achievement4: '',
    achievement5: ''
  });

  _currentProfile: any;
  _savedTag:boolean = false;
  _loading:boolean = false;

  constructor(private _fb: FormBuilder
    , private authenticationService: AuthenticationService
    , private _contentService: ContentService) { }


  ngOnInit(): void {
    this._savedTag = false;
    this._loading = false;
    console.log("Active Id : " + this.authenticationService.activeId);
    this.getProfileById(this.authenticationService.activeId);
  }

  getProfileById(activeId: any) {
    this._loading = true;
    this._contentService.getProfileById(activeId).subscribe((response) => {
      this._currentProfile = response;
      this.profileFormData.setValue({
        firstName: response.first,
        lastName: response.last,
        phoneNumber: response.contact,
        address: response.address,
        state: response.state,
        city: response.city,
        achievement1: response.arch[0],
        achievement2: response.arch[1],
        achievement3: response.arch[2],
        achievement4: response.arch[3],
        achievement5: response.arch[4]
      })
      this._loading = false;
    })
  }

  saveProfile(event:any)
  {
      console.log(this.profileFormData.value);
      if(this.profileFormData.valid)
      {
          let _achievements = [];
          _achievements.push((this.profileFormData.value.achievement1==null)?'':this.profileFormData.value.achievement1);
          _achievements.push((this.profileFormData.value.achievement2==null)?'':this.profileFormData.value.achievement2);
          _achievements.push((this.profileFormData.value.achievement3==null)?'':this.profileFormData.value.achievement3);
          _achievements.push((this.profileFormData.value.achievement4==null)?'':this.profileFormData.value.achievement4);
          _achievements.push((this.profileFormData.value.achievement5==null)?'':this.profileFormData.value.achievement5);

          let _body = {
              first : this.profileFormData.value.firstName,
              last : this.profileFormData.value.lastName,
              email : this._currentProfile.email,
              cgpa : Number(this._currentProfile.cgpa),
              address : this.profileFormData.value.address,
              city : this.profileFormData.value.city,
              state:this.profileFormData.value.state,
              contact : Number(this.profileFormData.value.phoneNumber),
              arch : _achievements
          }  
          console.log(_body);  
          this._loading = true;
          this._savedTag = false;
          this._contentService.updateProfile(_body).subscribe((resp)=>{
              this._loading = false;
              this._savedTag = true
              this.getProfileById(this.authenticationService.activeId);
          },
          (err)=>
          {
              alert('Could Not Update Profile')
          })  
      }
      else
      {
         console.log("Invalid form");
      }
  }



}
