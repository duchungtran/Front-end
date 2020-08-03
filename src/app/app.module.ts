import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { FooterComponent } from '../app/components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpModule } from '@angular/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VansComponent } from './components/vans/vans.component';
import { ConverseComponent } from './components/converse/converse.component';
import { NikeComponent } from './components/nike/nike.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SinglePageProductComponent } from './components/single-page-product/single-page-product.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { ProductManageComponent } from './components/product-manage/product-manage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CartComponent } from './components/cart/cart.component';
import { OrderManageComponent } from './components/order-manage/order-manage.component';
import { OwlModule } from 'ngx-owl-carousel';
import { CompleteOrderComponent } from './components/complete-order/complete-order.component';
import { CustomerManageComponent } from './components/customer-manage/customer-manage.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    VansComponent,
    ConverseComponent,
    NikeComponent,
    SinglePageProductComponent,
    NewProductComponent,
    ProductManageComponent,
    CartComponent,
    OrderManageComponent,
    CompleteOrderComponent,
    CustomerManageComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    OwlModule, // ToastrModule added
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
