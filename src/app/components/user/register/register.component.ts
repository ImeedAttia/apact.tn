import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseErrors } from 'src/app/moddels/firebase-errors';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorsStateMatcher } from '../Error-state-matcher';
import { Usernamevalidator } from '../username.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private authService: AuthService,private _snackBar: MatSnackBar){}

  ngOnInit(): void {
  }

  //Declaration
    // check the form is submitted or not yet
    isSubmited:boolean=false;
    // hide attribute for the password input
    hide:boolean = true;
    // attribute to check slide wither checked or not
    IsAccepted =false;

  //form group
  form : FormGroup = new FormGroup(
    {
      email: new FormControl("",[Validators.required,Validators.email]),
      password : new FormControl("",[Validators.required,Validators.minLength(8),Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]),
      cPassword : new FormControl("",[Validators.required])
    },
    {
      validators : Usernamevalidator.passwordMatch('password', 'cPassword')
    }
    );

  //get all Form Fields
  get email(){
    return this.form.get("email");
  }
  get password(){
    return this.form.get("password");
  }
  get cPassword(){
    return this.form.get("cPassword");
  }

  // match errors in the submition of form
  matcher = new ErrorsStateMatcher();

  // submit fntc
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.isSubmited = true;
    if(!this.form.invalid && this.IsAccepted){
      const user ={
        "email"     : this.email?.value,
        "password"  : this.password?.value,
      };
      this.authService.register(user).catch((error : any) => {this._snackBar.open(FirebaseErrors.Parse(error.code) , '❌')});
    }else{
      this._snackBar.open("Enter a valid informations !!!", '❌');
    }
  }

  googlesignin(){
    this.authService.GoogleAuth().catch((error:any) => {this._snackBar.open(FirebaseErrors.Parse(error.code) , '❌')});
  }
}
