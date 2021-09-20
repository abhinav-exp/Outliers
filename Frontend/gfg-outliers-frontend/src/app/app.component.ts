import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication-service.service';
import { ContentService } from './content-service.service';
import { LOGIN_AUTHENTICATION_CODES, SIGNUP_AUTHENTICATION_CODES } from './Utils/authentication-codes';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gfg-outliers-frontend';
  isAuthenticated:boolean = false;
  loginMode=true;
  signUpMode=false;

  isLoading:boolean = false;

  isAuthenticationFailed:boolean = false;
  authentication_failed_label:string = '';

  private activeId: string = '';

  constructor(private _fb:FormBuilder,
    private _contentService:ContentService,
    private _authenticationService:AuthenticationService)
  {
     
  }

 _signupForm:FormGroup = this._fb.group({
     _firstName:[null,Validators.required],
     _lastName: [null,Validators.required],
     _email : [null,[Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@iiit-bh.ac.in+$")]],
     _password : [null,[Validators.required,Validators.minLength(4)]]
 });

 _loginForm:FormGroup = this._fb.group({
     _email : [null,[Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@iiit-bh.ac.in+$")]],
     _password : [null,[Validators.required]]
 });

  ngOnInit(): void {

    this.isAuthenticated = false;
    this.signUpMode = false;
    this.loginMode = true;
    // this.devMode();
  }

  devMode()
  {
       this.isAuthenticated = true;
  }

  switchToSignUp(event:any)
  {
      this.signUpMode = true;
      this.loginMode = false;
      this._signupForm.reset();
      this.isAuthenticationFailed = false;
      this.isLoading = false;
  }
  switchToLogin(event:any)
  {
      this.signUpMode = false;
      this.loginMode = true;
      this._loginForm.reset();
      this.isAuthenticationFailed = false;
      this.isLoading = false;
  }

  authenticateSignUp(event:any)
  {
    this.isAuthenticationFailed = false;
    this.authentication_failed_label = "";
      console.log(this._signupForm.value);
      let _signUpBody = {
        
          first:this._signupForm.value._firstName,
          last:this._signupForm.value._lastName,
          email:this._signupForm.value._email,
          password:this._signupForm.value._password
      
      }

      
      if(this._signupForm.valid)
      {
           this.isLoading = true;
           this._authenticationService.authenticate_sign_up(_signUpBody).subscribe((response)=>
           {
               
              
               if(String(response.api_status) == '700')
               {
                    this.isAuthenticated = true;   
                    this.activeId = response.id;     
                    this._authenticationService.activeId = this.activeId;      
               }
               else{
                  this.isAuthenticationFailed = true;
                  this.authentication_failed_label = SIGNUP_AUTHENTICATION_CODES.get(String(response.api_status)) as string;
               }
               this.isLoading = false;
           })
      }
  }
  authenticateLogin(event:any)
  {
      // this.isAuthenticated = true;
      console.log(this._loginForm.value);
      this.isAuthenticationFailed = false;
      this.authentication_failed_label = "";
      let _loginBody = {
        email:this._loginForm.value._email,
        password:this._loginForm.value._password
    
    }
      
      if(this._loginForm.valid)
      {
           this.isLoading = true;
           this._authenticationService.authenticate_log_in(_loginBody).subscribe((response)=>
           {
               
              
               if(String(response.api_status) == '700')
               {
                    this.isAuthenticated = true;   
                    this.activeId = response.id;   
                    this._authenticationService.activeId = this.activeId;        
               }
               else{
                  this.isAuthenticationFailed = true;
                  this.authentication_failed_label = LOGIN_AUTHENTICATION_CODES.get(String(response.api_status)) as string;
               }
               this.isLoading = false;
           })
      }
  }
  


}
