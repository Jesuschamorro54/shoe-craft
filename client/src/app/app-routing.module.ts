import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaymentManagementComponent } from './components/payment-management/payment-management.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { authGuard } from './guards/auth.guard';

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

  { path: 'employees', component: ManageUserComponent, canActivate: [authGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
