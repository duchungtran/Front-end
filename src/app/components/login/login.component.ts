import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'mg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}
  public currentUser;
  userForm: FormGroup;
  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    });
  }

  get username() {
    return this.userForm.get('username');
  }
  get password() {
    return this.userForm.get('password');
  }
  onSignIn() {
    if (
      !this.userForm.hasError('requied', ['username', 'password']) &&
      !this.userForm.hasError('minlength', ['username', 'password']) &&
      !this.userForm.hasError('maxlength', ['username', 'password'])
    ) {
      var userLogin = {
        username: this.userForm.get('username').value,
        password: this.userForm.get('password').value,
      };
      this.authService.login(userLogin);
    }
    this.router.navigate(['/']);
    location.reload;
    //window.location.assign('http://localhost:4200/');
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
