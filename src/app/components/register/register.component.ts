import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}
  public newUser = {
    username: '',
    password: '',
    hoten: '',
    diachi: '',
    sodienthoai: '',
  };
  registerForm: FormGroup;
  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
      ]),
      hoten: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
      ]),
      diachi: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255),
      ]),
      sodienthoai: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(32),
      ]),
    });
  }

  register() {
    if (
      !this.registerForm.hasError('requied', [
        'username',
        'password',
        'hoten',
        'diachi',
        'sodienthoai',
      ]) &&
      !this.registerForm.hasError('minlength', [
        'username',
        'password',
        'hoten',
        'diachi',
        'sodienthoai',
      ]) &&
      !this.registerForm.hasError('maxlength', [
        'username',
        'password',
        'hoten',
        'diachi',
        'sodienthoai',
      ])
    ) {
      var userRegister = {
        username: this.registerForm.get('username').value,
        password: this.registerForm.get('password').value,
        hoten: this.registerForm.get('hoten').value,
        diachi: this.registerForm.get('diachi').value,
        sodienthoai: this.registerForm.get('sodienthoai').value,
      };
      this.authService.register(userRegister);
    }
  }

  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get hoten() {
    return this.registerForm.get('hoten');
  }
  get diachi() {
    return this.registerForm.get('diachi');
  }
  get sodienthoai() {
    return this.registerForm.get('sodienthoai');
  }
}
