import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

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
  public stringPrice = [];
  public vitriCartList;
  customerInfo: FormGroup;
  constructor(
    private productService: ProductService,
    private router: Router,
    public jwtHelper: JwtHelperService,
    public authService: AuthService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private cartService: CartService
  ) {}

  async ngOnInit(): Promise<void> {
    this.customerInfo = new FormGroup({
      hoten: new FormControl('', [Validators.required]),
      diachi: new FormControl('', [Validators.required]),
      sodienthoai: new FormControl('', [Validators.required]),
    });
    await this.getCurrentUser();
    await this.getCartList();
    
  }
  //Lấy thông tin người dùng
  async getCurrentUser() {
    const token = localStorage.getItem('auth-token');
    let tokenInfo = this.getDecodedAccessToken(token);
    if (token) {
      await this.authService.getCurrentUser().then((data) => {
        this.currentUser = data;
        //console.log(this.currentUser);
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
  //Lấy Cart từ db
  async getCartList() {
    if (!this.currentUser) {
      this.cartList = {product:[]}
      this.cartList.product = JSON.parse(localStorage.getItem('cartList'));
      console.log(this.cartList)
      if (this.cartList.product) {
        for (var i = 0; i < this.cartList.product.length; i++) {
          await this.productService
            .getProductById(this.cartList.product[i]._id)
            .then((data) => {
              this.product.push(data);
            });
        }
        this.priceCal();
      }
    } else {
      this.cartService.getCart(this.currentUser._id).then((data) => {
        this.cartList = data;
        if (this.cartList) {
          for (var i = 0; i < Object.keys(this.cartList.product).length; i++) {
            this.product.push(this.cartList.product[i].productId);
          }
        }
        this.priceCal();
      });
    }

    //console.log(this.subTotal);
  }
  decreaseNumber(i) {
    if (this.cartList.product[i].quantity > 1) {
      this.cartList.product[i].quantity = this.cartList.product[i].quantity - 1;
    }
    this.priceCal();
    localStorage.setItem("cartList",JSON.stringify(this.cartList.product));
    console.log(this.cartList);
  }
  increaseNumber(i) {
    //console.log(this.product[i].quantity);
    if (this.cartList.product[i].quantity < this.product[i].soluong) {
      this.cartList.product[i].quantity = this.cartList.product[i].quantity + 1;
    }
    this.priceCal();
    localStorage.setItem("cartList",JSON.stringify(this.cartList.product));
    console.log(this.cartList);
  }
  priceCal() {
    this.subTotal = 0;
    for (var i = 0; i < this.cartList.product.length; i++) {
      this.subTotal += this.cartList.product[i].quantity * this.product[i].price;
    }
    if (!this.currentUser) {
    } else {
      if (this.currentProduct) {
        var productToChange = {
          productId: this.currentProduct._id,
          quantity: this.cartList.product[this.vitriCartList].quantity,
          size: this.cartList.product[this.vitriCartList].size,
        };
        this.cartService.postCart(this.currentUser._id, productToChange);
      }
    }
  }
  soluongChange(i) {
    this.priceCal();
  }
  //Xóa item trong Cart
  deleteProduct() {
    if (!this.currentUser) {
      console.log(this.vitri);
      this.cartList.product.splice(this.vitri, 1);
      localStorage.setItem('cartList', JSON.stringify(this.cartList));
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/cart']));
    } else {
      this.cartService.deleteItem(
        this.currentUser._id,
        this.currentProduct._id
      );
    }
  }
  sizeChange() {
    localStorage.setItem(
      "cartList",
      JSON.stringify(this.cartList.product)
    );
  }
  sendOrder() {
    if (this.currentUser) {
      const order = {
        customer: this.currentUser._id,
        diachi: this.currentUser.diachi,
        sodienthoai: this.currentUser.sodienthoai,
      };
      this.orderService
        .order(order)
        .then((data) => {
          this.orderService
            .orderDetail(this.cartList)
            .then((data) => {
              this.toastr.success('Đặt hàng thành công');
              console.log(this.cartList);
              this.cartService.deleteCart(this.currentUser._id);
              //localStorage.removeItem(this.currentUser.username);
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
    } else {
      if(!this.customerInfo.get('hoten').hasError('required')&&
      !this.customerInfo.get('diachi').hasError('required')&&
      !this.customerInfo.get('sodienthoai').hasError('required')){
        const order = {
          hoten: this.customerInfo.get('hoten').value,
          diachi: this.customerInfo.get('diachi').value,
          sodienthoai: this.customerInfo.get('sodienthoai').value
        }
        this.orderService.order(order).then((data)=>{
          this.orderService.orderDetail(this.cartList).then((data)=>{
            this.toastr.success('Đặt hàng thành công');
            localStorage.removeItem('cartList');
            this.router.navigateByUrl('/',{ skipLocationChange: true })
            .then(() => this.router.navigate(['/cart']));
          }).catch((err) => {
            this.toastr.warning('Đặt hàng thất bại');
          });
        }).catch((err) => {
          this.toastr.warning('Đặt hàng thất bại');
        });
      }
      else {
        this.toastr.warning('Yêu cầu nhập đủ các trường thông tin');
      }
    }
  }
  checkCartList() {
    this.toastr.warning('Giỏ hàng rỗng');
  }
  get hoten() {
    return this.customerInfo.get('hoten');
  }
  get diachi() {
    return this.customerInfo.get('diachi');
  }
  get sodienthoai() {
    return this.customerInfo.get('sodienthoai');
  }
}
