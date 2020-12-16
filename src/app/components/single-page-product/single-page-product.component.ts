import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { data } from 'jquery';
@Component({
  selector: 'app-single-page-product',
  templateUrl: './single-page-product.component.html',
  styleUrls: ['./single-page-product.component.css'],
})
export class SinglePageProductComponent implements OnInit {
  public product;
  public currentUser;
  public size = 36.5;
  public imageUrl;
  public stringPrice;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    public authService: AuthService,
    public jwtHelper: JwtHelperService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.getCurrentUser();
  }
  async getProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.productService.getProductById(id).then((data) => {
      this.product = data;
    });
    this.imageUrl = [
      this.product.name +
        this.product.productImage[0].slice(
          this.product.productImage[0].length - 4
        ),
      this.product.name +
        this.product.productImage[1].slice(
          this.product.productImage[1].length - 7
        ),
      this.product.name +
        this.product.productImage[2].slice(
          this.product.productImage[2].length - 7
        ),
    ];
    this.stringPrice = Number(this.product.price).toLocaleString('number');
    console.log(this.stringPrice);
  }

  addToCart() {
    if (this.currentUser) {
      var productToAdd = {
        productId: this.product._id,
        quantity: 1,
        size: this.size,
      };
      this.cartService
        .postCart(this.currentUser._id, productToAdd)
        .then((data) => {
          this.toastr.success('Thêm vào giỏ hàng thành công');
        })
        .catch((err) => {
          this.toastr.warning('Thêm vào giỏ hàng thất bại');
        });
    } else {
      let temp1 = [];
      if (localStorage.getItem('cartList')) {
        temp1 = JSON.parse(localStorage.getItem('cartList'));
      }
      let temp = {_id: this.product._id, quantity: 1, size: this.size};
      temp1.push(temp);
      localStorage.setItem('cartList', JSON.stringify(temp1));
      this.toastr.success('Thêm vào giỏ hàng thành công');
    }
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
        //console.log(this.currentUser);
      });
    }
  }
}
