import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
            this.router.navigate(['/home']);
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
            this.router.navigate(['/home']);
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
          this.router.navigateByUrl('/login');
        },
        (err) => reject(err)
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
}
