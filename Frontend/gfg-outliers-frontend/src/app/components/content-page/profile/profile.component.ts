import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileFormData:FormGroup = this._fb.group({
    firstName: 'Gullu',
    lastName: 'Kumar',
    phoneNumber: '12369874525',
    address: 'Test Address',
    country: 'India',
    city: 'Faridabad'


 });;
  constructor(private _fb:FormBuilder) { }

  ngOnInit(): void 
  {
     
  }

}
