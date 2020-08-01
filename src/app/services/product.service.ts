import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: Http,
    public jwtHelper: JwtHelperService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  private url = 'http://localhost:3000/product';
  getDMProduct(
    pageSize?: number,
    pageIndex?: number,
    filter?: any
  ): Promise<any> {
    const options = filter
      ? { params: new HttpParams().set('filter', JSON.stringify(filter)) }
      : {};
    if (!pageIndex) {
      pageIndex = 1;
    }

    return new Promise((resolve, reject) => {
      this.http
        .get(this.url + `?size=${pageSize}&page=${pageIndex}`, options)
        .toPromise()
        .then((res) => {
          resolve(res.json());
        })
        .catch((err) => console.log(err));
    });
  }

  getProductById(id: any) {
    return new Promise((resolve, rejects) => {
      this.http
        .get(this.url + '/' + id)
        .toPromise()
        .then((res) => {
          resolve(res.json());
        })
        .catch((err) => console.log(err));
    });
  }

  createProduct(product: any): Promise<boolean> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('brand', product.brand);
    formData.append('soluong', product.soluong);
    formData.append('productImage', product.productImage[2]);
    formData.append('productImage', product.productImage[1]);
    formData.append('productImage', product.productImage[0]);
    formData.append('mota', product.mota);

    return new Promise((resolve, rejects) => {
      this.http.post(this.url, formData).subscribe(
        (res) => {
          resolve(true);
          this.toastr.success('Tạo sản phẩm mới thành công');
          setTimeout(
            () =>
              window.location.replace('http://localhost:4200/productmanage'),
            1000
          );
        },
        (err) => {
          this.toastr.warning(err._body);
          rejects(err);
        }
      );
    });
  }
  updateProduct(id: any, product: any): Promise<boolean> {
    console.log(id);
    return new Promise((resolve, rejects) => {
      this.http.put(this.url + '/' + id, product).subscribe(
        (res) => {
          resolve(true);
          setTimeout(
            () =>
              window.location.replace('http://localhost:4200/productmanage'),
            1000
          );
        },
        (err) => {
          this.toastr.warning(err._body);
          rejects(err);
        }
      );
    });
  }
  deleteProduct(id: any): Promise<boolean> {
    return new Promise((resolve, rejects) => {
      this.http.delete(this.url + '/' + id).subscribe(
        (res) => {
          resolve(true);
          setTimeout(
            () =>
              window.location.replace('http://localhost:4200/productmanage'),
            1000
          );
        },
        (err) => {
          this.toastr.warning(err._body);
          rejects(err);
        }
      );
    });
  }
  updateSoLuong(id: any, soluong: any): Promise<boolean> {
    return new Promise((resolve, rejects) => {
      this.http.patch(this.url + '/' + id, soluong).subscribe(
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
