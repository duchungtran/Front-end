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
    console.log(this.productForm.get('productImage').value);
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
