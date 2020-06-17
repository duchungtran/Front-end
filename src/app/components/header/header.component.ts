import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public currentUser;
  constructor(
    public jwtHelper: JwtHelperService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getCurrentUser() {
    const token = localStorage.getItem('auth-token');
    let tokenInfo = this.getDecodedAccessToken(token);
    if (token) {
      this.authService.getCurrentUser().then((data) => {
        this.currentUser = data;
        console.log(this.currentUser);
      });
    }
  }

  logout() {
    this.authService.logout();
  }

  checkRole() {
    if (this.currentUser.role == 'admin') {
      return true;
    } else return false;
  }
}
