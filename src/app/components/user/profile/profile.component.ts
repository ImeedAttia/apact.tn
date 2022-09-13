import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseErrors } from 'src/app/moddels/firebase-errors';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorsStateMatcher } from '../Error-state-matcher';
import { RecaptchaVerifier } from '@firebase/auth';
import { Auth, onAuthStateChanged, PhoneAuthProvider, updatePhoneNumber, User } from '@angular/fire/auth';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  UserData: any;

  constructor(private spinner: NgxSpinnerService,private auth: Auth,private authService : AuthService,private router : Router,private _snackBar: MatSnackBar) {}
    //variable have all user data
    userDataProfile : any ={};
    // check the form is submitted or not yet
    isSubmited:boolean=false;
    //phone change input field
    phoneInput:boolean = false;
    // recaptcha app verifier
    appVerifier !: RecaptchaVerifier;
    // hide btn when  verifing recaptcha
    btns : boolean=true;
    //hide or show otp code
    otp : boolean = false;
    //show or hide recaptcha
    recaptcha : boolean = true;
    //verification id for the user
    verificationId: any;
    //verification code
    verificationCode : string="";

  ngOnInit(): void {
    this.refreshProfile()
    this.appVerifier = window.recaptchaVerifier;
  }

  // all info on user stocked in userData
  async refreshProfile(){
    this.userDataProfile = this.authService.getAuthLocal();
    this.userDataProfile = {
      'uid'           : this.userDataProfile.uid,
      "displayName"   : this.userDataProfile.displayName ? this.userDataProfile.displayName : "foulen ben foulen",
      "email"         : this.userDataProfile.email,
      "phoneNumber"   : this.userDataProfile.phoneNumber ? this.userDataProfile.phoneNumber : '',
      "emailVerified" : this.userDataProfile.emailVerified ? 'primary' : 'warn',
      "photoURL"      : this.userDataProfile.photoURL ? this.userDataProfile.photoURL :   "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"    }
  }

  //fntc that send email verification
  sendEmailVerification(){
    this.authService.sendEmailVerification().then(() =>{
      this._snackBar.open("Email Sent successfully please check your spam!", '✅');
    }).catch((error : any)  => {this._snackBar.open(FirebaseErrors.Parse(error.code) , '❌')} )
  }

  //click to lunch phone number submitting form
  clickToShowOrHideInput(){
    this.phoneInput = !this.phoneInput ;
  }

  //form validator for phone number
  form : FormGroup = new FormGroup({
    phone: new FormControl("",[Validators.required,Validators.pattern("[0-9]{2}[0-9]{3}[0-9]{3}")])
  });

  //get phone number
  get phone(){
    return this.form.get("phone");
  }
  // match errors in the submition of form
  matcher = new ErrorsStateMatcher();

  // submit fntc for phone number
   onSubmit(){
    // TODO: Use EventEmitter with form value
    this.isSubmited = true;
    if(!this.form.invalid){
      this.userDataProfile.phoneNumber = this.phone?.value;
      const phoneNumber = '+216'+ this.phone?.value;
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': async () => {
      this.appVerifier = window.recaptchaVerifier;
      const provider = new PhoneAuthProvider(this.auth);
      this.verificationId = await provider.verifyPhoneNumber(phoneNumber, this.appVerifier);
      // Obtain the verificationCode from the user.
      this.recaptcha = false;
      this.otp = true;
      },
      'expired-callback': () => {
        this._snackBar.open("veuillez vous vérifier le recaptcha", '❌');
      }
      }, this.auth);

      window.recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
      this.btns=false;
      });
    }else{
      this._snackBar.open("Enter a valid informations !!!", '❌');
    }
  }

  // otp options for code verification
  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    autofocus: true,
    classList: {
      inputBox: 'my-super-box-class',
      input: 'my-super-class',
      inputFilled: 'my-super-filled-class',
      inputDisabled: 'my-super-disable-class',
      inputSuccess: 'my-super-success-class',
      inputError: 'my-super-error-class',
    },
  };


  //when the user compelete filling code verification store it in data base
  async handleFillEvent(value: string) : Promise<void>{
    this.verificationCode = value;
    const phoneCredential = PhoneAuthProvider.credential(this.verificationId, this.verificationCode);
    await updatePhoneNumber(this.auth.currentUser as User, phoneCredential)
    .then(()=>{
      onAuthStateChanged(this.auth,(user: any)=>{
          this.UserData = user;
          localStorage.setItem('user', JSON.stringify(this.UserData));
      });
      this.showSpinner(); this._snackBar.open("votre numéro est enregistré avec succès", '✅');})
    .catch((error : any)  => {this._snackBar.open(FirebaseErrors.Parse(error.code) , '❌');})
  }

  //function to lunch spinner
  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
        /** spinner ends after 2 seconds */
        this.spinner.hide();
        location.reload();
    }, 2000);
  }

  


}
