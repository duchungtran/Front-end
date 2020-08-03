import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
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
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    public authService: AuthService,
    public jwtHelper: JwtHelperService
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
    console.log(this.imageUrl);
    console.log(this.product);
  }

  addToCart() {
    if (this.currentUser) {
      var temp1 = [];
      var customer = this.currentUser.username;
      if (JSON.parse(localStorage.getItem(this.currentUser.username))) {
        temp1 = JSON.parse(localStorage.getItem(this.currentUser.username));
      }
      var temp = { id: this.product._id, soluong: 1, size: this.size };
      temp1.push(temp);
      localStorage.setItem(this.currentUser.username, JSON.stringify(temp1));
      this.toastr.success('Thêm vào giỏ hàng thành công');
      console.log(temp1);
    } else {
      this.toastr.warning('Yêu cầu đăng nhập để thêm sản phẩm vào giỏ');
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
