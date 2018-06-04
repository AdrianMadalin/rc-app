import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  err: Boolean = false;
  errResponse: String = '';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signInUser(email, password)
      .then((response) => {
      console.log(response);
      this.router.navigate(['/signin']);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      this.err = true;
      this.errResponse = errorMessage;
    });
  }

}
