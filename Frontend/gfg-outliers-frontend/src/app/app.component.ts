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
  //This is the title for the Angular application
  title = 'gfg-outliers-frontend';

  //This variable maintains the state of being authenticated or not
  isAuthenticated: boolean = false;

  //This variables maintins toggle state of the login screen
  loginMode = true;

  //This variables maintins toggle state of the login screen
  signUpMode = false;

  //Maintains state of loading or not
  isLoading: boolean = false;

  //Maintains state of authentication failing
  isAuthenticationFailed: boolean = false;

  //The label contains message to display on failed authentication
  authentication_failed_label: string = '';

  //Maintains id of loggen in student
  private activeId: string = '';

  constructor(private _fb: FormBuilder,                      //Form builder injected
    private _contentService: ContentService,                 // Content Service injected
    private _authenticationService: AuthenticationService    //Authentication service injected
  ) { }

  //Reactive form for sign up  
  _signupForm: FormGroup = this._fb.group({
    _firstName: [null, Validators.required],
    _lastName: [null, Validators.required],
    _email: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@iiit-bh.ac.in+$")]],
    _password: [null, [Validators.required, Validators.minLength(4)]]
  });

  //Reactive form for login
  _loginForm: FormGroup = this._fb.group({
    _email: [null, [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@iiit-bh.ac.in+$")]],
    _password: [null, [Validators.required]]
  });

  ngOnInit(): void {
    this.isAuthenticated = false;
    this.signUpMode = false;
    this.loginMode = true;
  }

  //Toggle signup screen
  switchToSignUp(event: any) {
    this.signUpMode = true;
    this.loginMode = false;
    this._signupForm.reset();
    this.isAuthenticationFailed = false;
    this.isLoading = false;
  }

  //Toggle login screen
  switchToLogin(event: any) {
    this.signUpMode = false;
    this.loginMode = true;
    this._loginForm.reset();
    this.isAuthenticationFailed = false;
    this.isLoading = false;
  }

  //Form submission for signing up
  authenticateSignUp(event: any) {
    this.isAuthenticationFailed = false;
    this.authentication_failed_label = "";

    let _signUpBody = {
      first: this._signupForm.value._firstName,
      last: this._signupForm.value._lastName,
      email: this._signupForm.value._email,
      password: this._signupForm.value._password
    }

    //Call service method only if form is valid
    if (this._signupForm.valid) {
      this.isLoading = true;
      this._authenticationService.authenticate_sign_up(_signUpBody).subscribe((response) => {

        if (String(response.api_status) == '700') {
          this.isAuthenticated = true;
          this.activeId = response.id;
          this._authenticationService.activeId = this.activeId;
          this._authenticationService._isCR_Aunthenticated = false;
        }
        else {
          this.isAuthenticationFailed = true;
          this.authentication_failed_label = SIGNUP_AUTHENTICATION_CODES.get(String(response.api_status)) as string;
        }
        this.isLoading = false;
      })
    }
  }

  //Form submission for login
  authenticateLogin(event: any) {
    console.log(this._loginForm.value);
    this.isAuthenticationFailed = false;
    this.authentication_failed_label = "";
    let _loginBody = {
      email: this._loginForm.value._email,
      password: this._loginForm.value._password

    }

    //Call service method only if form is valid
    if (this._loginForm.valid) {
      this.isLoading = true;
      this._authenticationService.authenticate_log_in(_loginBody).subscribe((response) => {


        if (String(response.api_status) == '700') {
          this.isAuthenticated = true;
          this.activeId = response.id;
          this._authenticationService.activeId = this.activeId;
          this._authenticationService._isCR_Aunthenticated = response.is_CR;
        }
        else {
          this.isAuthenticationFailed = true;
          this.authentication_failed_label = LOGIN_AUTHENTICATION_CODES.get(String(response.api_status)) as string;
        }
        this.isLoading = false;
      })
    }
  }



}
