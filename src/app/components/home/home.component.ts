import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public product: any;
  public lastestProduct: Array<Object> = [];
  constructor(
    public productService: ProductService,
    private route: ActivatedRoute
  ) {}
  public pageSize = 0;
  public pageIndex = 1;
  public filter = { brand: 'any' };
  ngOnInit(): void {
    this.getDMProduct(this.pageSize, this.pageIndex, this.filter);
  }
  async getDMProduct(pageSize, pageIndex, filter) {
    await this.productService.getDMProduct().then((data) => {
      this.product = data;
    });
    var length = Object.keys(this.product).length;
    for (var i = 1; i <= 6; i++) {
      this.lastestProduct[i - 1] = this.product[length - i];
      //console.log(this.lastestProduct[i - 1]);
    }
  }
}
