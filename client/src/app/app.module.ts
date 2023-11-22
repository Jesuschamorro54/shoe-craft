import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { AuthService } from './services/auth.service';
import { UserMenuComponent } from './components/nav-bar/components/user-menu/user-menu.component';
import { ProductsComponent } from './components/products/products.component';
import { NewProductModalComponent } from './components/products/components/new-product-modal/new-product-modal.component';


export const getToken = (authService: AuthService, ) => {
  return () => authService.verifyToken();
}

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
    UserMenuComponent,
    ProductsComponent,
    NewProductModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: getToken,
      deps: [AuthService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
