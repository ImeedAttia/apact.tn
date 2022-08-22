import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  getStorage,
  ref,
  listAll
} from "firebase/storage";
@Injectable({
  providedIn: 'root'
})
export class UserService {
storage : any
  constructor( private firebaseApp : FirebaseApp) {


   }

   getImg(){
    return this.storage = getStorage(this.firebaseApp, "gs://my-custom-bucket");
   }

   
}
