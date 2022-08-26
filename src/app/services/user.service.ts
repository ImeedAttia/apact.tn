import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, getDoc} from '@angular/fire/firestore';
import { addDoc, CollectionReference, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UserData } from './../moddels/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
storage : any
private collections: CollectionReference;
constructor(public firestore: Firestore) {
  this.collections = collection(this.firestore, 'User')
}

  async get(id: string) {
    return (await getDoc(doc(this.collections, id)))
  }
  getData(){
    return collectionData(this.collections,{  idField: 'id'}) as Observable<UserData[]>;
  }
  deleteData(id:string){
    deleteDoc(doc(this.firestore,'User',id));
  }
  createData(user:UserData) {
      return setDoc(doc(this.collections,user.uid),user)
  }
  updateData(user : UserData){
    return updateDoc(doc(this.firestore,'User',user.uid as string),{phoneNumber : user.phoneNumber});
  }
}
