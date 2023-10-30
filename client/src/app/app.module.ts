import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaymentManagementComponent } from './components/payment-management/payment-management.component';
import { ProductRegistrationComponent } from './components/product-registration/product-registration.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { CreateUserModalComponent } from './components/modals/create-user-modal/create-user-modal.component';

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
    CreateUserModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
