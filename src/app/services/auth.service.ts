import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string;
  constructor(
    private http: Http,
    public jwtHelper: JwtHelperService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  private loginUrl = 'http://localhost:3000/customer/login';
  private userUrl = 'http://localhost:3000/user/login';
  private registerUrl = 'http://localhost:3000/customer/register';
  private url = 'http://localhost:3000/customer/';
  private adminUrl = 'http://localhost:3000/user/';

  login(user: any): Promise<boolean> {
    if (user.username != 'admin') {
      return new Promise((resolve, reject) => {
        this.http.post(this.loginUrl, user).subscribe(
          (res) => {
            localStorage.setItem('auth-token', res.json().token);
            window.location.replace('http://localhost:4200/home');
          },
          (err) => {
            //console.log(err._body);
            this.toastr.warning(err._body);
            reject(err);
          }
        );
      });
    } else {
      return new Promise((resolve, reject) => {
        this.http.post(this.userUrl, user).subscribe(
          (res) => {
            localStorage.setItem('auth-token', res.json().token);
            window.location.replace('http://localhost:4200/home');
          },
          (err) => {
            //console.log(err._body);
            this.toastr.warning(err._body);
            reject(err);
          }
        );
      });
    }
  }

  register(user: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post(this.registerUrl, user).subscribe(
        (res) => {
          resolve(true);
          this.toastr.success('Đăng ký thành công');
          this.router.navigateByUrl('/login');
        },
        (err) => {
          this.toastr.warning(err._body);
          reject(err);
        }
      );
    });
  }

  getCurrentUser() {
    const token = localStorage.getItem('auth-token');
    const decodeToken = this.jwtHelper.decodeToken(token);
    if (decodeToken['_id'] != '5ee78cf15e71a22be49a49f5') {
      return new Promise((resolve, reject) => {
        this.http
          .get(this.url + decodeToken['_id'])
          .toPromise()
          .then((res) => {
            resolve(res.json());
          })
          .catch((err) => console.log(err));
      });
    } else {
      return new Promise((resolve, reject) => {
        this.http
          .get(this.adminUrl + decodeToken['_id'])
          .toPromise()
          .then((res) => {
            resolve(res.json());
          })
          .catch((err) => console.log(err));
      });
    }
  }
  logout() {
    localStorage.removeItem('auth-token');
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('auth-token');
    // Check whether the token is expired and return
    // true or false
    if (token == null) {
      return false;
    } else {
      return !this.jwtHelper.isTokenExpired(token);
    }
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  isAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }
    const token = localStorage.getItem('auth-token');
    const decodeToken = this.jwtHelper.decodeToken(token);
    // get token from local storage or state management
    if (decodeToken['_id'] != '5ee78cf15e71a22be49a49f5') {
      var currentUser;
      this.getCurrentUser().then((data) => {
        currentUser = data;
      });
      // check if it was decoded successfully, if not the token is not valid, deny access
      if (!currentUser) {
        console.log('Invalid token');
        return false;
      }
      return allowedRoles.includes(currentUser['role']);
    } else {
      return allowedRoles.includes('admin');
    }
    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
  }
}
