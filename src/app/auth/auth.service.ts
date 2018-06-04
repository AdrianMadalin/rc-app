import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor() {
  }

  public signUpUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  public signInUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  public getToken() {
    return firebase.auth().currentUser.getIdToken();
  }
}
