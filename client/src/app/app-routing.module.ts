import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaymentManagementComponent } from './components/payment-management/payment-management.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'payment-management', component: PaymentManagementComponent,
    children: [
    { path: 'records', component: PaymentListComponent },
    { path: 'pending-payments', component: PaymentListComponent },
    { path: 'exit-payments', component: PaymentListComponent },
    ]
  },
  { path: 'employees', component: ManageUserComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
