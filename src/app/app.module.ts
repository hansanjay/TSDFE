import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { AgentRegisteraionComponent } from './agent-registeraion/agent-registeraion.component';
import { UserListComponent } from './user-list/user-list.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AddressListComponent } from './address-list/address-list.component';
import { FilterPipe } from './filter.pipe';
import { AllocateCustomersComponent } from './allocate-customers/allocate-customers.component';
import { ProductsComponent } from './products/products.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { ToastrModule } from 'ngx-toastr';
import { UserTypeDetailsComponent } from './user-type-details/user-type-details.component';
import { AgentCustComponent } from './agent-cust/agent-cust.component';
import { SubscriptionlistComponent } from './subscriptionlist/subscriptionlist.component';
import { OrderListComponent } from './order-list/order-list.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { JourneyPlanComponent } from './journey-plan/journey-plan.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    AgentRegisteraionComponent,
    UserListComponent,
    AgentListComponent,
    LoginComponent,
    DashboardComponent,
    AddressListComponent,
    FilterPipe,
    AllocateCustomersComponent,
    ProductsComponent,
    SubscriptionFormComponent,
    ProductDetailsComponent,
    UserTypeDetailsComponent,
    AgentCustComponent,
    SubscriptionlistComponent,
    OrderListComponent,
    EditAddressComponent,
    JourneyPlanComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
