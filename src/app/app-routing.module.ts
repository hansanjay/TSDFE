import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentRegisteraionComponent } from './agent-registeraion/agent-registeraion.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserListComponent } from './user-list/user-list.component';
import { AgentListComponent } from './agent-list/agent-list.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthService} from './auth.service'
import { AllocateCustomersComponent } from './allocate-customers/allocate-customers.component';
import { ProductsComponent } from './products/products.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AuthGuard } from './auth.guard';
import { UserTypeDetailsComponent } from './user-type-details/user-type-details.component';
import { AgentCustComponent } from './agent-cust/agent-cust.component';
import { SubscriptionlistComponent } from './subscriptionlist/subscriptionlist.component';
import { OrderListComponent } from './order-list/order-list.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { JourneyPlanComponent } from './journey-plan/journey-plan.component';
const routes: Routes = [
  {path: 'Customer/:userType', component: AgentRegisteraionComponent, canActivate: [AuthGuard]},
  {path: 'Register', component: RegistrationComponent, canActivate: [AuthGuard] },
  {path: 'Distributor', component: UserListComponent, canActivate: [AuthGuard] },
  {path: 'customersList/:distId/:userType' , component: AgentListComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'allocatecustomer/:userType/:distId/:custId', component:AllocateCustomersComponent, canActivate: [AuthGuard]},
  {path: 'product-form/:distId', component:ProductsComponent, canActivate: [AuthGuard]},
  {path: 'subscribe/:created_by/:custId', component:SubscriptionFormComponent, canActivate: [AuthGuard]},
  {path: 'product-search', component:ProductDetailsComponent, canActivate: [AuthGuard]},
  {path: 'address/:mobile/:custId', component:AddressListComponent, canActivate: [AuthGuard]},
  {path: 'user-type', component:UserTypeDetailsComponent, canActivate: [AuthGuard]},
  {path: 'customerbyAgent/:agentid', component:AgentCustComponent, canActivate: [AuthGuard]},
  {path: 'subscription-list/:id', component:SubscriptionlistComponent, canActivate: [AuthGuard]},
  {path: 'order-list/:id', component:OrderListComponent, canActivate: [AuthGuard]},
  {path: 'address-edit/:mobile/:custId/:userId', component:EditAddressComponent, canActivate: [AuthGuard]},
  {path: 'journeyPlan/:userId', component:JourneyPlanComponent, canActivate: [AuthGuard]},
  //customerbyAgent
  //[routerLink]="['/journeyPlan',userData?.id]"
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload',
    anchorScrolling: 'enabled',
    useHash: true,
    scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
