import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { rejects } from 'assert';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private http: Http,
    private router: Router,
    private toastr: ToastrService
  ) {}

  private cartUrl = 'http://localhost:3000/cart';
  //Lấy danh sách giỏ hàng
  getCart(userId?: any) {
    const options = userId
      ? { params: new HttpParams().set('filter', JSON.stringify(userId)) }
      : {};
    return new Promise((resolve, reject) => {
      this.http
        .get(this.cartUrl, options)
        .toPromise()
        .then((res) => {
          resolve(res.json());
        })
        .catch((err) => rejects(err));
    });
  }
  //Khởi tạo / Update giỏ hàng
  postCart(userId: any, product: any) {
    var item = {
      userId: userId,
      product: product,
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.cartUrl, item).subscribe(
        (res) => {
          resolve(true);

          console.log(res);
        },
        (err) => {
          reject(err);
          console.log(err);
        }
      );
    });
  }
  deleteItem(userId: any, productId: any) {
    const options = {
      params: new HttpParams()
        .set('userId', userId)
        .set('productId', productId),
    };
    this.http.delete(this.cartUrl, options).subscribe(
      (res) => {
        console.log(res);
        setTimeout(
          () => window.location.replace('http://localhost:4200/cart'),
          1000
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteCart(customerId: any): Promise<boolean> {
    console.log(customerId);
    return new Promise((resolve, reject) => {
      this.http.delete(this.cartUrl + '/' + customerId).subscribe(
        (res) => {
          console.log(res);
          resolve(true);
        },
        (err) => {
          rejects(err);
        }
      );
    });
  }
}
