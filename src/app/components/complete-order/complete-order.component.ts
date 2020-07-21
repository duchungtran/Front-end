import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.component.html',
  styleUrls: ['./complete-order.component.css'],
})
export class CompleteOrderComponent implements OnInit {
  public orders;
  public currentOrder;
  public product;
  public total = [];
  public priceForm = [];
  public subTotal;
  public pageSize = 10;
  public pageIndex = 1;
  public filter = {};
  public orderLength;
  public idFilter = '';
  public nameFilter = '';
  public sdtFilter = '';
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCompleteOrder(this.pageSize, this.pageIndex, this.filter);
    this.getAll();
  }
  async getCompleteOrder(pageSize: number, pageIndex: number, filter: any) {
    await this.orderService.getCompleteOrder().then((data) => {
      this.orders = data;
    });
    console.log(this.orders);
  }
  async getPageEvent() {
    await this.orderService
      .getCompleteOrder(this.pageSize, this.pageIndex, this.filter)
      .then((data) => {
        this.orders = data;
      });
  }
  filterOrder() {
    this.filter['id'] = { $regex: this.idFilter, $options: 'i' };
    this.orderService
      .getCompleteOrder(this.pageSize, this.pageIndex, this.filter)
      .then((data) => {
        this.orders = data;
      });
    console.log(this.filter);
    console.log(this.orders);
  }
  async getAll() {
    await this.orderService.getCompleteOrder(0, 0, this.filter).then((data) => {
      this.orderLength = data;
      //console.log(this.productLength);
    });
    this.orderLength = Object.keys(this.orderLength).length;
  }
  async getProduct() {
    var tempProduct = [];
    var length = 0;
    for (var i = 0; i < this.currentOrder.product.length; i++) {
      await this.productService
        .getProductById(this.currentOrder.product[i])
        .then((data) => {
          tempProduct.push(data);
          this.product = tempProduct;
        });
      length += 1;
    }
    this.priceCal();
    //this.product = tempProduct;
    //console.log(this.product);
  }

  priceCal() {
    this.subTotal = 0;
    for (var i = 0; i < this.product.length; i++) {
      this.priceForm[i] = this.product[i].price.split('.').join('');
      this.priceForm[i] = parseInt(this.priceForm[i], 10);
      //console.log(this.priceForm[i]);
      this.priceForm[i] = this.priceForm[i] * this.currentOrder.soluong[i];
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
  }

  deleteCompleteOrder() {
    this.orderService
      .deleteCompleteOrder(this.currentOrder._id)
      .then((data) => {
        this.toastr.success('Xóa đơn hàng thành công');
        window.location.reload();
      })
      .catch((err) => {
        this.toastr.warning('Xóa đơn hàng thất bại');
      });
  }
}
