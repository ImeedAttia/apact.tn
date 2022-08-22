import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseErrors } from 'src/app/moddels/firebase-errors';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService : AuthService,private _snackBar: MatSnackBar) {}
  userData : any ={};

  ngOnInit(): void {
    this.refreshProfile()
  }
  refreshProfile(){
    this.userData = this.authService.getAuthLocal();

    this.userData = {
      "displayName" : this.userData.displayName ? this.authService.getAuthLocal().displayName : "foulen ben foulen",
      "email" :this.userData.email,
      "phone" :this.userData.phone ? this.authService.getAuthLocal().phone : 'No Phone number',
      "emailVerified" : this.userData.emailVerified ? 'primary' : 'warn',
      "photoURL" : this.userData.providerData[0].photoURL ? this.userData.providerData[0].photoURL :   "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
    }
}
send(){
  this.authService.sendEmailVerification().then(() =>{
    this._snackBar.open("Email Sent successfully please check your spam!", '✅');
  }).catch((error : any)  => {this._snackBar.open(FirebaseErrors.Parse(error.code) , '❌')} )
}

}
