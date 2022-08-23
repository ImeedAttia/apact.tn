import { Injectable,NgZone  } from '@angular/core';
import {sendEmailVerification } from "firebase/auth";

import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,

} from '@angular/fire/auth';

import { Router } from '@angular/router';
import { Login } from '../moddels/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  UserData : any;


  constructor(private auth: Auth,private router : Router, public ngZone: NgZone){
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


  getAuthFire(){
    return this.auth.currentUser;
  }



  getAuthLocal(){
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user;
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  }


  register({ email, password }: Login) {
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then((result: any) => {
      this.UserData = result
      this.ngZone.run(() => {
        this.sendEmailVerification()
        window.location.reload();
        this.router.navigate(['/home']);
      });
    })
  }


  logout() {
     signOut(this.auth).then(()=>this.router.navigate(['/login']))

  }



  GoogleAuth() {
    return this.loginWithGoogle(new GoogleAuthProvider());
  }


  loginWithGoogle(provider :any) {
    return signInWithPopup(this.auth,provider).then(() => {
      window.location.reload();
    })
  }
 async  sendPasswordResetEmails(email : string){
    return sendPasswordResetEmail(this.auth,email);
  }



  sendEmailVerification(){
    return sendEmailVerification(this.auth.currentUser as User);
  }


  FacebookAuth() {
    return this.loginWithFacebook(new FacebookAuthProvider());
  }


  loginWithFacebook(provider :any) {
    return signInWithPopup(this.auth,provider).then((result) => {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      console.log(accessToken);
      window.location.reload();
    })
  }


}
