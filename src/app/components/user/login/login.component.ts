import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseErrors } from 'src/app/moddels/firebase-errors';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorsStateMatcher } from '../Error-state-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthService,private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  //Declaration
    //Check the form is submitted or not yet
    isSubmited:boolean=false;
    //Hide attribute for the password input
    hide:boolean = true;
    //Login is failed case
    isLoginFailed = false;
    //To display Login Error in case of failure
    errorMessage = '';

  //form validators
  form : FormGroup = new FormGroup({
    email : new FormControl("",[Validators.required,Validators.email]),
    password : new FormControl("",[Validators.required,Validators.minLength(8)])
  });

  //get all Form Fields
  get email(){
    return this.form.get("email")
  }
  get password(){
    return this.form.get("password")
  }

  // match errors in the submition of form
  matcher = new ErrorsStateMatcher();

  // submit fntc
  onSubmit() {
    const LoginInfo = {'email' : this.email?.value,'password' : this.password?.value};
    if(this.form.valid)
    {
      this.authService.login(LoginInfo).catch((error : any) => this._snackBar.open(FirebaseErrors.Parse(error.code), '❌'));
    }else
    {
      this._snackBar.open("Enter a valid informations !!!", '❌');
    }
  }
  googlesignin(){
    this.authService.GoogleAuth().catch((error : any) => this._snackBar.open(FirebaseErrors.Parse(error.code) , '❌'));
  }
  facebookSignin(){
    this.authService.FacebookAuth().catch((error : any) => this._snackBar.open(FirebaseErrors.Parse(error.code) , '❌'));
  }

}
