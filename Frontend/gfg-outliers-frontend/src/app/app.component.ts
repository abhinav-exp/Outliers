import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.isAuthenticated = false;
    this.signUpMode = false;
    this.loginMode = true;
  }

  switchToSignUp(event:any)
  {
      this.signUpMode = true;
      this.loginMode = false;
  }
  switchToLogin(event:any)
  {
      this.signUpMode = false;
      this.loginMode = true;
  }

  authenticateForNow(event:any)
  {
      this.isAuthenticated = true;
  }
  


}
