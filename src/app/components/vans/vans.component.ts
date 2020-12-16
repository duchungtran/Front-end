import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-vans',
  templateUrl: './vans.component.html',
  styleUrls: ['./vans.component.css'],
})
export class VansComponent implements OnInit {
  public pageSize = 12;
  public pageIndex = 1;
  public filter = {
    brand: 'vans',
  };
  public sortName;
  public productLength;
  constructor(public productService: ProductService) {}
  public product: any;
  public stringPrice = [];
  ngOnInit(): void {
    this.getVansProduct(this.pageSize, this.pageIndex, this.filter);
    this.getAll();
  }
  async getVansProduct(pageSize: number, pageIndex: number, filter: any) {
    await this.productService
      .getDMProduct(pageSize, pageIndex, filter)
      .then((data) => {
        this.product = data;
      });
    for (var i = 0; i < Object.keys(this.product).length; i++) {
      this.stringPrice.push(
        Number(this.product[i].price).toLocaleString('number')
      );
    }
  }

  async getAll() {
    await this.productService.getDMProduct(0, 0, this.filter).then((data) => {
      this.productLength = data;
    });
    this.productLength = Object.keys(this.productLength).length;
  }

  async getPageEvent() {
    await this.productService
      .getDMProduct(this.pageSize, this.pageIndex, this.filter)
      .then((data) => {
        this.product = data;
      });
    for (var i = 0; i < Object.keys(this.product).length; i++) {
      this.stringPrice.push(
        Number(this.product[i].price).toLocaleString('number')
      );
    }
  }
}
