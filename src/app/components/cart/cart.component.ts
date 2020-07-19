import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public cartList;
  public product = [];
  public priceForm = [];
  public total = [];
  public subTotal;
  public currentProduct;
  public vitri;
  public currentUser;
  constructor(
    private productService: ProductService,
    private router: Router,
    public jwtHelper: JwtHelperService,
    public authService: AuthService,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getCurrentUser();
    await this.getCartList();
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
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  async getCartList() {
    this.cartList = JSON.parse(localStorage.getItem(this.currentUser.username));
    //console.log(this.cartList);
    if (this.cartList) {
      for (var i = 0; i < this.cartList.length; i++) {
        await this.productService
          .getProductById(this.cartList[i].id)
          .then((data) => {
            this.product.push(data);
            this.priceForm.push(this.product[i].price);
          });
      }
      console.log(this.product);
      this.priceCal();
    }

    //console.log(this.subTotal);
  }
  decreaseNumber(i) {
    if (this.cartList[i].soluong > 1) {
      this.cartList[i].soluong = this.cartList[i].soluong - 1;
    }
    this.priceCal();
    //console.log(this.cartList[i]);
  }
  increaseNumber(i) {
    //console.log(this.product[i].soluong);
    if (this.cartList[i].soluong < this.product[i].soluong) {
      this.cartList[i].soluong = this.cartList[i].soluong + 1;
    }
    this.priceCal();
    //console.log(this.cartList[i]);
  }
  priceCal() {
    this.subTotal = 0;
    for (var i = 0; i < this.cartList.length; i++) {
      this.priceForm[i] = this.product[i].price.split('.').join('');
      this.priceForm[i] = parseInt(this.priceForm[i], 10);
      this.priceForm[i] = this.priceForm[i] * this.cartList[i].soluong;
      //console.log(this.priceForm[i]);
      this.subTotal = this.subTotal + this.priceForm[i];
      if (!this.total[i]) {
        this.total.push(Number(this.priceForm[i]).toLocaleString('number'));
      } else {
        this.total[i] = Number(this.priceForm[i]).toLocaleString('number');
      }
      //console.log(this.total);
    }
    this.subTotal = Number(this.subTotal).toLocaleString('number');
    localStorage.setItem(
      this.currentUser.username,
      JSON.stringify(this.cartList)
    );
  }
  soluongChange(i) {
    this.priceCal();
  }
  deleteProduct() {
    this.cartList.splice(this.vitri, 1);
    localStorage.setItem(
      this.currentUser.username,
      JSON.stringify(this.cartList)
    );
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/cart']));
  }
  sizeChange() {
    localStorage.setItem(
      this.currentUser.username,
      JSON.stringify(this.cartList)
    );
  }
  sendOrder() {
    this.getCurrentUser();
    var order = {
      customer: this.currentUser._id,
    };
    this.orderService
      .order(order)
      .then((data) => {
        this.orderService
          .orderDetail(this.cartList)
          .then((data) => {
            this.toastr.success('Đặt hàng thành công');
            localStorage.removeItem(this.currentUser.username);
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => this.router.navigate(['/cart']));
          })
          .catch((err) => {
            this.toastr.warning('Đặt hàng thất bại');
          });
      })
      .catch((err) => {
        this.toastr.warning('Đặt hàng thất bại');
      });
  }
  checkCartList() {
    this.toastr.warning('Giỏ hàng rỗng');
  }
}
