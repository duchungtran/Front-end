import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartService } from '../../services/cart.service';
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
  public cartListLength = 0;
  public filter = {};
  public nameFilter = '';
  public product;
  public stringPrice = [];
  constructor(
    public jwtHelper: JwtHelperService,
    public authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getCurrentUser();
    if (!this.currentUser) {
      this.getProductInCart();
    } else {
      this.getProductInCartDB();
    }
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
    this.cartList = JSON.parse(localStorage.getItem('cartList'));
    this.cartListLength = this.cartList.length;
  }
  async getProductInCartDB() {
    await this.cartService
      .getCart(this.currentUser._id)
      .then((data) => (this.cartList = data));
    if (this.cartList) {
      this.cartListLength = this.cartList.product.length;
    }
  }
  async getDMProduct(pageSize: number, pageIndex: number, filter: any) {
    await this.productService.getDMProduct().then((data) => {
      this.product = data;
    });
    console.log(this.product);
  }
  async filterProduct(event: any) {
    this.nameFilter = event;
    this.filter['name'] = { $regex: this.nameFilter, $options: 'i' };
    await this.productService.getDMProduct(6, 1, this.filter).then((data) => {
      this.product = data;
    });
    if (!this.nameFilter) {
      this.product = null;
    }
    if (this.product) {
      for (var i = 0; i < Object.keys(this.product).length; i++) {
        this.stringPrice.push(
          Number(this.product[i].price).toLocaleString('number')
        );
      }
    }
  }
}
