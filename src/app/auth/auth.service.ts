import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable({providedIn: 'root'})
export class AuthService {
  public token: string;

  constructor() {
  }

  public signInUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  public signUpUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  public async getToken() {
    return await firebase.auth().currentUser.getIdToken()
      .then((token: string) => {
        console.log('Auth service - token', token);
        this.token = token;
        return token;
      });
  }

  public getUser() {
    return firebase.auth().currentUser['email'];
  }

  public isAuthenticated() {
    return this.token != null;
  }

  public logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
