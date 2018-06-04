import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signUpUser(email, password)
      .then((response) => {
      console.log(response);
      this.router.navigate(['/']);
    }).catch( (error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Recived error code: `, errorCode);
      console.log(`Recived error message: `, errorMessage);
      console.log(error);
    });
  }

}
