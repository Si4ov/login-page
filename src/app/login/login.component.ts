import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponceData } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild ("form", {static: true} ) loginForm : NgForm;
  constructor(private authService :AuthService,
              private router: Router) { }



  ngOnInit(): void {
  }

  isLoginMode = true;
  isLoading = false;
  error: string= null;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(loginForm: NgForm){
    if( !loginForm.valid){
      return;
    }
    const email = loginForm.value.email;
    const password = loginForm.value.password;

    let authObs: Observable<AuthResponceData>;

    this.isLoading = true;


    if( this.isLoginMode){

      authObs = this.authService.login(email,password);

    }else{
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe(respData =>{
      console.log(respData);
      this.isLoading = false;
      this.router.navigate(['/main-page'])
    }, errorResp =>{
      console.log(errorResp);
      switch (errorResp.error.error.message){
        case "EMAIL_NOT_FOUND":
          this.error = 'Email not found. Sign up first...';
          break;
        case "EMAIL_EXISTS":
          this.error = 'This email already in use. Switch to Log In ';
          break;
        case "INVALID_EMAIL":
          this.error = 'Try to use normal email... not test@test etc.';
          break;
      };
      this.isLoading = false;
    });
    loginForm.reset();

  }

}
