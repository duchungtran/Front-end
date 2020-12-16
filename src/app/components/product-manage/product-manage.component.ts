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
  public stringPrice = [];
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
    for (var i = 0; i < Object.keys(this.product).length; i++) {
      this.stringPrice.push(
        Number(this.product[i].price).toLocaleString('number')
      );
    }
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
      ])
    ) {
      var newProduct = {
        name: this.productForm.get('name').value,
        price: this.productForm.get('price').value,
        brand: this.productForm.get('brand').value,
        soluong: this.productForm.get('soluong').value,
        mota: this.productForm.get('mota').value,
      };
      if (
        newProduct.name &&
        newProduct.price &&
        newProduct.brand &&
        newProduct.soluong
      ) {
        this.productService
          .updateProduct(this.currentProduct._id, newProduct)
          .then((data) => {
            this.toastr.success('Cập nhập thông tin sản phẩm thành công');
          })
          .catch((err) => {
            this.toastr.warning('Cập nhập thông tin sản phẩm thất bại');
          });
      } else {
        this.toastr.warning('Yêu cầu nhập đầy đủ các trường thông tin');
      }
    } else {
      this.toastr.warning('Yêu cầu nhập đầy đủ các trường thông tin');
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
