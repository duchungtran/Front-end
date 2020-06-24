import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  public product: {};
  public newProduct: {
    name: any;
    price: any;
    brand: any;
    soluong: any;
    productImage: any;
    mota: any;
  };
  public image = [];
  productForm: FormGroup;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      soLuong: new FormControl('', [Validators.required]),
      productImage: new FormControl('', [Validators.required]),
      moTa: new FormControl('', []),
    });
  }

  createProduct() {
    if (
      !this.productForm.hasError('required', [
        'name',
        'price',
        'brand',
        'soLuong',
        'productImage',
        'moTa',
      ])
    ) {
      var priceFrom = this.productForm.get('price').value;
      priceFrom = Number(priceFrom).toLocaleString('number');
      //console.log(priceFrom);
      this.newProduct = {
        name: this.productForm.get('name').value,
        price: priceFrom,
        brand: this.productForm.get('brand').value,
        soluong: this.productForm.get('soLuong').value,
        productImage: this.image,
        mota: this.productForm.get('moTa').value,
      };
      console.log(this.newProduct);
      this.productService.createProduct(this.newProduct);
    }
  }
  onSelectFile(event) {
    if (event.target.files.length > 0) {
      this.image = event.target.files;
    }
  }
  get name() {
    return this.productForm.get('name');
  }
  get price() {
    return this.productForm.get('price');
  }
  get brand() {
    return this.productForm.get('brand');
  }
  get soLuong() {
    return this.productForm.get('soLuong');
  }
  get productImage() {
    return this.productForm.get('productImage');
  }
  get moTa() {
    return this.productForm.get('moTa');
  }
}
