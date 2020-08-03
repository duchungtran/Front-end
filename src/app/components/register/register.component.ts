import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
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
        Validators.minLength(5),
        Validators.maxLength(32),
      ]),
    });
  }

  register() {
    if (
      !this.registerForm.get('username').hasError('required') &&
      !this.registerForm.get('password').hasError('required') &&
      !this.registerForm.get('hoten').hasError('required') &&
      !this.registerForm.get('diachi').hasError('required') &&
      !this.registerForm.get('sodienthoai').hasError('required') &&
      !this.registerForm.get('username').hasError('minlength') &&
      !this.registerForm.get('password').hasError('minlength') &&
      !this.registerForm.get('hoten').hasError('minlength') &&
      !this.registerForm.get('diachi').hasError('minlength') &&
      !this.registerForm.get('sodienthoai').hasError('minlength') &&
      !this.registerForm.get('username').hasError('maxlength') &&
      !this.registerForm.get('password').hasError('maxlength') &&
      !this.registerForm.get('hoten').hasError('maxlength') &&
      !this.registerForm.get('diachi').hasError('maxlength') &&
      !this.registerForm.get('sodienthoai').hasError('maxlength')
    ) {
      var userRegister = {
        username: this.registerForm.get('username').value,
        password: this.registerForm.get('password').value,
        hoten: this.registerForm.get('hoten').value,
        diachi: this.registerForm.get('diachi').value,
        sodienthoai: this.registerForm.get('sodienthoai').value,
      };
      if (
        userRegister.username &&
        userRegister.password &&
        userRegister.hoten &&
        userRegister.diachi &&
        userRegister.sodienthoai
      ) {
        this.authService.register(userRegister);
      } else {
        this.toastr.warning('Yêu cầu nhập đầy đủ các trường thông tin');
      }
    } else {
      this.toastr.warning('Yêu cầu nhập đầy đủ các trường thông tin');
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
