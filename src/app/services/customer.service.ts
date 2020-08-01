import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customerUrl = 'http://localhost:3000/customer';
  constructor(
    private http: Http,
    private router: Router,
    private toastr: ToastrService
  ) {}

  getDMCustomer(pageSize?: number, pageIndex?: number, filter?: any) {
    const options = filter
      ? { params: new HttpParams().set('filter', JSON.stringify(filter)) }
      : {};
    if (!pageIndex) {
      pageIndex = 1;
    }
    return new Promise((resolve, reject) => {
      this.http
        .get(this.customerUrl + `?size=${pageSize}&page=${pageIndex}`, options)
        .toPromise()
        .then((res) => {
          resolve(res.json());
        })
        .catch((err) => console.log(err));
    });
  }

  updateCustomer(id: any, customer: any): Promise<boolean> {
    console.log(id);
    return new Promise((resolve, rejects) => {
      this.http.put(this.customerUrl + '/' + id, customer).subscribe(
        (res) => {
          resolve(true);
          setTimeout(
            () =>
              window.location.replace('http://localhost:4200/customermanage'),
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

  deleteCustomer(id: any): Promise<boolean> {
    return new Promise((resolve, rejects) => {
      this.http.delete(this.customerUrl + '/' + id).subscribe(
        (res) => {
          resolve(true);
          setTimeout(
            () =>
              window.location.replace('http://localhost:4200/customermanage'),
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
}
