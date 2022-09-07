import { Inject, Injectable,NgZone  } from '@angular/core';
import {sendEmailVerification } from "firebase/auth";

import {
  Auth,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { Analytics, setUserProperties } from "firebase/analytics";


import { Router } from '@angular/router';
import { Login } from '../moddels/login';
import { UserService } from './user.service';
import { UserData } from '../moddels/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  UserData : any;


  constructor(private auth: Auth,private router : Router, public ngZone: NgZone,private userService : UserService){
    onAuthStateChanged(this.auth,(user: any)=>{
      if(user){
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
   }


  //get User
    //get Authenticated user from firebase
    getAuthFire(){
      return this.auth.currentUser;
    }
    //get Authenticated user from Local Storage
    getAuthLocal(){
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user;
    }
        //Check wither User Is looged in or not
    get isLoggedIn(): boolean {
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user !== null ? true : false;
    }

    //Form Register Method
    register({ email, password }: Login) {
      return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        const  user = this.UserMakeData(result);
        this.userService.createData(user);
        this.ngZone.run(() => {
          this.sendEmailVerification()
          window.location.reload();
          this.router.navigate(['/home']);
        });
      })
    }
    //Form Login Method
    login({email ,password } : Login){
      return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        this.UserData = result
        this.ngZone.run(() => {
          window.location.reload();
          this.router.navigate(['/home']);
        });
      })
    }
    //Logout
    logout() {
      signOut(this.auth).then(()=>this.router.navigate(['/login']))
    }

  //login with Email or Facebook
    //Login with Google
    GoogleAuth() {
      return this.loginWithPopup(new GoogleAuthProvider());
    }


    //Login with Facebook
    //FacebookAuth() {
    //  return this.loginWithPopup(new FacebookAuthProvider());
    //}


    //Pop Up Provider
    loginWithPopup(provider :any) {
      return signInWithPopup(this.auth,provider).then(async (result) => {

        if(!(await this.userService.get(result.user.uid)).exists()){
          const  user = this.UserMakeData(result);
          this.userService.createData(user).then((res) => console.log(res)).catch((error) => console.log(error));
        }
        window.location.reload();
      });
    }
    //Add User To database
    UserMakeData(result ?: any){
      const userImpl = result.user;
      const user : UserData ={
        uid: userImpl.uid,
        email:userImpl.email,
        displayName:userImpl.displayName,
        photoURL:userImpl.photoURL,
        emailVerified:userImpl.emailVerified,
        phoneNumber : userImpl.phoneNumber,
        Cin : null
        }
      return user;
    }
    //Send Password Reset Email
    async sendPasswordResetEmails(email : string){
      return sendPasswordResetEmail(this.auth,email);
    }
    //Send Email Verification
    sendEmailVerification(){
      return sendEmailVerification(this.auth.currentUser as User );
    }


}
