import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-nike',
  templateUrl: './nike.component.html',
  styleUrls: ['./nike.component.css'],
})
export class NikeComponent implements OnInit {
  public pageSize = 12;
  public pageIndex = 1;
  public filter = {
    brand: 'nike',
  };
  public productLength;
  constructor(public productService: ProductService) {}
  public product: any;
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
  }
}
