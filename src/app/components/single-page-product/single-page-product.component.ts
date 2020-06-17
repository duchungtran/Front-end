import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-single-page-product',
  templateUrl: './single-page-product.component.html',
  styleUrls: ['./single-page-product.component.css'],
})
export class SinglePageProductComponent implements OnInit {
  public product;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }
  async getProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.productService.getProductById(id).then((data) => {
      this.product = data;
    });
  }
}
