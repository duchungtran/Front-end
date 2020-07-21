import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VansComponent } from './components/vans/vans.component';
import { ConverseComponent } from './components/converse/converse.component';
import { NikeComponent } from './components/nike/nike.component';
import { SinglePageProductComponent } from './components/single-page-product/single-page-product.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductManageComponent } from './components/product-manage/product-manage.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderManageComponent } from './components/order-manage/order-manage.component';
import { CompleteOrderComponent } from './components/complete-order/complete-order.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'vans',
    component: VansComponent,
  },
  {
    path: 'converse',
    component: ConverseComponent,
  },
  {
    path: 'nike',
    component: NikeComponent,
  },
  {
    path: 'newproduct',
    component: NewProductComponent,
  },
  {
    path: 'productmanage',
    component: ProductManageComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'ordermanage',
    component: OrderManageComponent,
  },
  {
    path: 'completeorder',
    component: CompleteOrderComponent,
  },
  {
    path: ':id',
    component: SinglePageProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
