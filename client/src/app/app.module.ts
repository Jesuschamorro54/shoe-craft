import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaymentManagementComponent } from './components/payment-management/payment-management.component';
import { ProductRegistrationComponent } from './components/product-registration/product-registration.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { SkeletonListEmployeesComponent } from './components/skeleton/skeleton-list-employees/skeleton-list-employees.component';
import { RemoveModalComponent } from './components/modals/create-user-modal/remove-modal/remove-modal.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    FooterComponent,
    PaymentManagementComponent,
    ProductRegistrationComponent,
    PaymentListComponent,
    ManageUserComponent,
    EmployeeListComponent,
    SkeletonListEmployeesComponent,
    RemoveModalComponent,
    CreateEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
