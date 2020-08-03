import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public currentUser;
  constructor(public jwtHelper: JwtHelperService,
    public authService: AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  async getCurrentUser() {
    const token = localStorage.getItem('auth-token');
    let tokenInfo = this.getDecodedAccessToken(token);
    if (token) {
      await this.authService.getCurrentUser().then((data) => {
        this.currentUser = data;
        console.log(this.currentUser);
      });
    }
  }
}
