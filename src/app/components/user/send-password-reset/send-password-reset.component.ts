import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseErrors } from 'src/app/moddels/firebase-errors';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-send-password-reset',
  templateUrl: './send-password-reset.component.html',
  styleUrls: ['./send-password-reset.component.css']
})
export class SendPasswordResetComponent implements OnInit {
  email : string = ""
  constructor(private authService : AuthService,private router : Router,private _snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }
  send(){
    this.authService.sendPasswordResetEmails(this.email).catch((error) => {this._snackBar.open(FirebaseErrors.Parse(error.code) , '❌')});
    this.router.navigate(['/login']);
  }

}
