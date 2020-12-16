import { Http, Response, HttpModule } from '@angular/http';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: Http, private router: Router) {}

  private orderUrl = 'http://localhost:3000/order';
  private orderDetailUrl = 'http://localhost:3000/orderdetail';
  private completeOrderUrl = 'http://localhost:3000/completeorder';
  public order_id;
  order(order: any): Promise<boolean> {
    //console.log(customer);
    return new Promise((resolve, reject) => {
      this.http.post(this.orderUrl, order).subscribe(
        (res) => {
          resolve(true);
          console.log(res.json())
          this.order_id = res.json()._id;
        },
        (err) => reject(err)
      );
    });
  }
  orderDetail(detail: any): Promise<boolean> {
    console.log(detail);
    var orderDetail = {
      order: this.order_id,
      orderDetail: detail,
    };
    //console.log(orderDetail);
    return new Promise((resolve, reject) => {
      this.http.post(this.orderDetailUrl, orderDetail).subscribe(
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

  getOrderDetail(pageSize?: number, pageIndex?: number, filter?: any) {
    const options = filter
      ? { params: new HttpParams().set('filter', JSON.stringify(filter)) }
      : {};
    if (!pageIndex) {
      pageIndex = 1;
    }
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.orderDetailUrl + `?size=${pageSize}&page=${pageIndex}`,
          options
        )
        .toPromise()
        .then((res) => {
          resolve(res.json());
        })
        .catch((err) => console.log(err));
    });
  }

  getCompleteOrder(pageSize?: number, pageIndex?: number, filter?: any) {
    const options = filter
      ? { params: new HttpParams().set('filter', JSON.stringify(filter)) }
      : {};
    if (!pageIndex) {
      pageIndex = 1;
    }
    return new Promise((resolve, reject) => {
      this.http
        .get(
          this.completeOrderUrl + `?size=${pageSize}&page=${pageIndex}`,
          options
        )
        .toPromise()
        .then((res) => {
          resolve(res.json());
        })
        .catch((err) => console.log(err));
    });
  }

  completeOrder(orderDetail: any) {
    var completeOrder = {
      id: orderDetail.id,
      order: orderDetail.order._id,
      product: orderDetail.product,
      size: orderDetail.size,
      soluong: orderDetail.soluong,
    };
    return new Promise((resolve, reject) => {
      this.http.post(this.completeOrderUrl, completeOrder).subscribe(
        (res) => {
          resolve(true);
        },
        (err) => reject(err)
      );
    });
  }

  deleteOrderDetail(id: any): Promise<boolean> {
    return new Promise((resolve, rejects) => {
      this.http.delete(this.orderDetailUrl + '/' + id).subscribe(
        (res) => {
          resolve(true);
        },
        (err) => {
          rejects(err);
        }
      );
    });
  }

  deleteCompleteOrder(id: any): Promise<boolean> {
    console.log(id);
    return new Promise((resolve, rejects) => {
      this.http.delete(this.completeOrderUrl + '/' + id).subscribe(
        (res) => {
          resolve(true);
        },
        (err) => {
          rejects(err);
        }
      );
    });
  }
}
