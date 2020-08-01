import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-customer-manage',
  templateUrl: './customer-manage.component.html',
  styleUrls: ['./customer-manage.component.css'],
})
export class CustomerManageComponent implements OnInit {
  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {}
  public customer;
  public customerLength;
  public currentCustomer;
  public pageSize = 10;
  public pageIndex = 1;
  public filter = {};
  public hotenFilter = '';
  public sdtFilter = '';
  customerForm: FormGroup;
  ngOnInit(): void {
    this.getDMCustomer(this.pageSize, this.pageIndex, this.filter);
    this.getAll();
    this.customerForm = new FormGroup({
      hoten: new FormControl('', [Validators.required]),
      diachi: new FormControl('', [Validators.required]),
      sodienthoai: new FormControl('', [Validators.required]),
    });
  }
  async getDMCustomer(pageSize: number, pageIndex: number, filter: any) {
    await this.customerService.getDMCustomer().then((data) => {
      this.customer = data;
    });
    console.log(this.customer);
  }

  async getPageEvent() {
    await this.customerService
      .getDMCustomer(this.pageSize, this.pageIndex, this.filter)
      .then((data) => {
        this.customer = data;
      });
  }

  async getAll() {
    await this.customerService.getDMCustomer(0, 0, this.filter).then((data) => {
      this.customerLength = data;
      //console.log(this.productLength);
    });
    this.customerLength = Object.keys(this.customerLength).length;
  }

  filterCustomer() {
    this.filter['hoten'] = { $regex: this.hotenFilter, $options: 'i' };
    this.filter['sodienthoai'] = { $regex: this.sdtFilter, $options: 'i' };
    console.log(this.filter);
    this.customerService
      .getDMCustomer(this.pageSize, this.pageIndex, this.filter)
      .then((data) => {
        this.customer = data;
      });
    console.log(this.customer);
  }
  setFormValue() {
    this.customerForm.controls['hoten'].setValue(this.currentCustomer.hoten);
    this.customerForm.controls['diachi'].setValue(this.currentCustomer.diachi);
    this.customerForm.controls['sodienthoai'].setValue(
      this.currentCustomer.sodienthoai
    );
    console.log(this.currentCustomer);
  }

  updateCustomer() {
    if (
      !this.customerForm.hasError('required', [
        'hoten',
        'diachi',
        'sodienthoai',
      ])
    ) {
      var newCustomer = {
        hoten: this.customerForm.get('hoten').value,
        diachi: this.customerForm.get('diachi').value,
        sodienthoai: this.customerForm.get('sodienthoai').value,
      };
      this.customerService
        .updateCustomer(this.currentCustomer._id, newCustomer)
        .then((data) => {
          this.toastr.success('Cập nhập thông tin khách hàng thành công');
        })
        .catch((err) => {
          this.toastr.warning('Cập nhập thông tin khách hàng thất bại');
        });
    }
  }

  deleteCustomer() {
    this.customerService
      .deleteCustomer(this.currentCustomer._id)
      .then((data) => {
        this.toastr.success('Xóa khách hàng thành công');
      })
      .catch((err) => {
        this.toastr.warning('Xóa khách hàng thất bại');
      });
  }

  get hoten() {
    return this.customerForm.get('hoten');
  }
  get diachi() {
    return this.customerForm.get('diachi');
  }
  get sodienthoai() {
    return this.customerForm.get('sodienthoai');
  }
}
