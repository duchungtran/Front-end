import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { Inject, AfterViewInit, ElementRef } from '@angular/core';
@Component({
  selector: 'app-single-page-product',
  templateUrl: './single-page-product.component.html',
  styleUrls: ['./single-page-product.component.css'],
})
export class SinglePageProductComponent implements OnInit, AfterViewInit {
  public product;
  public size = 36.5;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    @Inject(DOCUMENT) private document,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }
  ngAfterViewInit() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML = "console.log('done');"; //inline script
    s.src = 'src/assets/js/custom.js'; //external script
  }

  async getProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.productService.getProductById(id).then((data) => {
      this.product = data;
    });
    console.log(this.product);
  }

  addToCart() {
    var temp1 = [];
    if (JSON.parse(localStorage.getItem('productsInCart'))) {
      temp1 = JSON.parse(localStorage.getItem('productsInCart'));
    }
    var temp = { id: this.product._id, soluong: 1, size: this.size };
    temp1.push(temp);
    localStorage.setItem('productsInCart', JSON.stringify(temp1));
    this.toastr.success('Thêm vào giỏ hàng thành công');
    console.log(temp1);
  }
}
