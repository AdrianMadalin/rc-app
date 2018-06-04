import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const config = {
      apiKey: 'AIzaSyCjZAbGwkB6cE0gn9mSh6a8YRBZ8judYJ4',
      authDomain: 'ng-recipe-book-fdb19.firebaseapp.com',
      databaseURL: 'https://ng-recipe-book-fdb19.firebaseio.com',
      projectId: 'ng-recipe-book-fdb19',
      storageBucket: 'ng-recipe-book-fdb19.appspot.com',
      messagingSenderId: '205092265160'
    };
    firebase.initializeApp(config);
  }

}
