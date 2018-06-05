import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable({providedIn: 'root'})
export class AuthService {
  public token: string;

  constructor() {
  }

  public signUpUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  public signInUser(email: string, password: string) {
    // firebase.auth().currentUser.getIdToken()
    //   .then((token: string) => {
    //     console.log(token);
    //     this.token = token;
    //   });
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  public getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token: string) => {
        console.log(token);
        this.token = token;
      });
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
