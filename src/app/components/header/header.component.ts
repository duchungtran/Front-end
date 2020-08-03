import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public currentUser;
  public cartList;
  public filter = {};
  public nameFilter = '';
  public product;
  constructor(
    public jwtHelper: JwtHelperService,
    public authService: AuthService,
    private router: Router,
    private productService: ProductService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getCurrentUser();
    this.getProductInCart();
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
    window.location.replace('http://localhost:4200/home');
  }

  checkRole() {
    if (this.currentUser.role == 'admin') {
      return true;
    } else return false;
  }

  getProductInCart() {
    this.cartList = JSON.parse(localStorage.getItem(this.currentUser.username));
    this.cartList = this.cartList.length;
  }
  async getDMProduct(pageSize: number, pageIndex: number, filter: any) {
    await this.productService.getDMProduct().then((data) => {
      this.product = data;
    });
    console.log(this.product);
  }
  filterProduct(event: any) {
    this.nameFilter = event;
    this.filter['name'] = { $regex: this.nameFilter, $options: 'i' };
    this.productService.getDMProduct(6, 1, this.filter).then((data) => {
      this.product = data;
    });
    if (!this.nameFilter) {
      this.product = null;
    }
    console.log(this.product);
  }
}
