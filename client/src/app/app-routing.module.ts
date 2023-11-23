import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaymentManagementComponent } from './components/payment-management/payment-management.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductRegistrationComponent } from "./components/product-registration/product-registration.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'payment-management', component: PaymentManagementComponent,
    children: [
    { path: 'records', component: PaymentListComponent },
    { path: 'pending-payments', component: PaymentListComponent },
    { path: 'exit-payments', component: PaymentListComponent },
    ],
    canActivate: [authGuard]
  },
  { path: 'employees', component: ManageUserComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'product', component: ProductComponent},
  { path: 'add-product', component: ProductRegistrationComponent},

  { path: 'employees', component: ManageUserComponent, canActivate: [authGuard]},
  { path: 'products', component: ProductsComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: '/login', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
