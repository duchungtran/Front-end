import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css'],
})
export class ProductManageComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}
  public product;
  public currentProduct;
  public pageSize = 10;
  public pageIndex = 1;
  public filter = {};
  public productLength;
  public numberPrice;
  public brandList = ['vans', 'converse', 'nike'];
  public nameFilter = '';
  public brandFilter = '';
  productForm: FormGroup;
  ngOnInit(): void {
    this.getDMProduct(this.pageSize, this.pageIndex, this.filter);
    this.getAll();
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      soluong: new FormControl('', [Validators.required]),
      productImage: new FormControl('', [Validators.required]),
      mota: new FormControl('', []),
    });
  }
  async getDMProduct(pageSize: number, pageIndex: number, filter: any) {
    await this.productService.getDMProduct().then((data) => {
      this.product = data;
    });
    console.log(this.product);
  }

  async getPageEvent() {
    await this.productService
      .getDMProduct(this.pageSize, this.pageIndex, this.filter)
      .then((data) => {
        this.product = data;
      });
  }

  async getAll() {
    await this.productService.getDMProduct(0, 0, this.filter).then((data) => {
      this.productLength = data;
      //console.log(this.productLength);
    });
    this.productLength = Object.keys(this.productLength).length;
  }

  filterProduct() {
    this.filter['name'] = { $regex: this.nameFilter, $options: 'i' };
    this.filter['brand'] = { $regex: this.brandFilter, $options: 'i' };
    this.productService
      .getDMProduct(this.pageSize, this.pageIndex, this.filter)
      .then((data) => {
        this.product = data;
      });
    console.log(this.product);
  }
  updateProduct() {
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
      var newProduct = {
        name: this.productForm.get('name').value,
        price: priceFrom,
        brand: this.productForm.get('brand').value,
        soluong: this.productForm.get('soluong').value,
        mota: this.productForm.get('mota').value,
      };
      this.productService
        .updateProduct(this.currentProduct._id, newProduct)
        .then((data) => {
          this.toastr.success('Cập nhập thông tin sản phẩm thành công');
        })
        .catch((err) => {
          this.toastr.warning('Cập nhập thông tin sản phẩm thất bại');
        });
    }
  }
  deleteProduct() {
    this.productService
      .deleteProduct(this.currentProduct._id)
      .then((data) => {
        this.toastr.success('Xóa sản phẩm thành công');
      })
      .catch((err) => {
        this.toastr.warning('Xóa sản phẩm thất bại');
      });
  }
  setFormValue() {
    this.productForm.controls['name'].setValue(this.currentProduct.name);
    this.productForm.controls['price'].setValue(this.currentProduct.price);
    this.productForm.controls['brand'].setValue(this.currentProduct.brand);
    this.productForm.controls['soluong'].setValue(this.currentProduct.soluong);
    this.productForm.controls['mota'].setValue(this.currentProduct.mota);
    this.numberPrice = this.productForm.get('price').value;
    this.numberPrice = this.numberPrice.split('.').join('');
    this.numberPrice = parseInt(this.numberPrice, 10);
    this.productForm.controls['price'].setValue(this.numberPrice);
    console.log(this.currentProduct);
  }

  getValue(event) {
    this.productForm.controls['brand'].setValue(event);
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
  get soluong() {
    return this.productForm.get('soluong');
  }
  get productImage() {
    return this.productForm.get('productImage');
  }
  get moTa() {
    return this.productForm.get('moTa');
  }
}
