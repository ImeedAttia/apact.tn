import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseErrors } from 'src/app/moddels/firebase-errors';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorsStateMatcher } from '../Error-state-matcher';
import { UserService } from 'src/app/services/user.service';
import { UserData } from './../../../moddels/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService : AuthService,private UserService : UserService,private _snackBar: MatSnackBar) {}
    //variable have all user data
    userDataProfile : any ={};
    // check the form is submitted or not yet
    isSubmited:boolean=false;
    //phone change input field
    phoneInput:boolean = false;

  ngOnInit(): void {
    this.refreshProfile()
  }

  async refreshProfile(){
    this.userDataProfile =(await this.UserService.get(this.authService.getAuthLocal().uid as string)).data() as UserData;
    this.userDataProfile = {
      'uid'           : this.userDataProfile.uid,
      "displayName"   : this.userDataProfile.displayName ? this.userDataProfile.displayName : "foulen ben foulen",
      "email"         : this.userDataProfile.email,
      "phoneNumber"   : this.userDataProfile.phoneNumber ? this.userDataProfile.phoneNumber : '',
      "emailVerified" : this.userDataProfile.emailVerified ? 'primary' : 'warn',
      "photoURL"      : this.userDataProfile.photoURL ? this.userDataProfile.photoURL :   "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp",
      "Cin"           : this.userDataProfile.Cin
    }
  }

  clickToShowOrHideInput(){
    this.phoneInput = !this.phoneInput ;
  }

  form : FormGroup = new FormGroup({
    phone: new FormControl("",[Validators.required,Validators.pattern("[0-9]{2}[0-9]{3}[0-9]{3}")])
  });
  get phone(){
    return this.form.get("phone");
  }
  // match errors in the submition of form
  matcher = new ErrorsStateMatcher();

  // submit fntc
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.isSubmited = true;
    if(!this.form.invalid){
     this.userDataProfile.phoneNumber = this.phone?.value;
      alert(this.phone?.value)
      this.UserService.updateData(this.userDataProfile)
      .then(()=>{ window.location.reload(); this._snackBar.open("Email Sent successfully please check your spam!", '✅');})
      .catch((error : any)  => {this._snackBar.open(FirebaseErrors.Parse(error.code) , '❌')})
    }else{
      this._snackBar.open("Enter a valid informations !!!", '❌');
    }
  }



  sendEmailVerification(){
    this.authService.sendEmailVerification().then(() =>{
      this._snackBar.open("Email Sent successfully please check your spam!", '✅');
    }).catch((error : any)  => {this._snackBar.open(FirebaseErrors.Parse(error.code) , '❌')} )
  }

}
