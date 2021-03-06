import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css'],
})
export class OrderManageComponent implements OnInit {
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
  public stringPrice = [];
  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getOrders(this.pageSize, this.pageIndex, this.filter);
    this.getAll();
  }
  async getOrders(pageSize: number, pageIndex: number, filter: any) {
    await this.orderService.getOrderDetail().then((data) => {
      this.orders = data;
    });
    console.log(this.orders);
  }
  async getPageEvent() {
    await this.orderService
      .getOrderDetail(this.pageSize, this.pageIndex, this.filter)
      .then((data) => {
        this.orders = data;
      });
  }
  filterOrder() {
    this.filter['id'] = { $regex: this.idFilter, $options: 'i' };
    this.orderService
      .getOrderDetail(this.pageSize, this.pageIndex, this.filter)
      .then((data) => {
        this.orders = data;
      });
    console.log(this.filter);
    console.log(this.orders);
  }
  async getAll() {
    await this.orderService.getOrderDetail(0, 0, this.filter).then((data) => {
      this.orderLength = data;
      //console.log(this.productLength);
    });
    this.orderLength = Object.keys(this.orderLength).length;
  }
  async getProduct() {
    var tempProduct = [];
    var length = 0;
    for (let i = 0; i < this.currentOrder.product.length; i++) {
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
      this.subTotal = this.subTotal + this.product[i].price * this.currentOrder.soluong[i];
      //console.log(this.total);
    }
  }

  completeOrder() {
    this.orderService
      .completeOrder(this.currentOrder)
      .then((data) => {
        this.orderService
          .deleteOrderDetail(this.currentOrder._id)
          .then((data) => {
            for (var i = 0; i < this.currentOrder.product.length; i++) {
              const productSoLuong = {
                soluong: this.product[i].soluong - this.currentOrder.soluong[i],
              };
              this.productService.updateSoLuong(
                this.currentOrder.product[i],
                productSoLuong
              );
            }
            this.toastr.success('Hoàn tất đơn hàng thành công');
            setTimeout(() => window.location.reload(), 1000);
          });
      })
      .catch((err) => {
        this.toastr.warning('Hoàn tất đơn hàng thất bại');
      });
  }
}
