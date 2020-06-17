import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VansComponent } from './components/vans/vans.component';
import { ConverseComponent } from './components/converse/converse.component';
import { NikeComponent } from './components/nike/nike.component';
import { SinglePageProductComponent } from './components/single-page-product/single-page-product.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { combineLatest } from 'rxjs';
const routes: Routes = [
  {
    path: '',
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
    path: ':id',
    component: SinglePageProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
