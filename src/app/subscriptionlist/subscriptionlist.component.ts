import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-subscriptionlist',
  templateUrl: './subscriptionlist.component.html',
  styleUrls: ['./subscriptionlist.component.scss']
})
export class SubscriptionlistComponent implements OnInit {

  subscriptionId: any;
  allOrders: any;
  custId: any;
  allSubscription: any;
  userData: any;
  allBrand: any;
  custData: any;

 
  constructor(private router:ActivatedRoute,
    private registerService:RegisterService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
        // this.subscriptionId = param['Id'];
        this.custData = localStorage.getItem('customerDetails')
        this.custData = JSON.parse(this.custData );
        this.userData = localStorage.getItem('user')
        this.userData = JSON.parse(this.userData );
        this.custId = param['id']
        this.selectBrand()
        this.fetchSubscription(this.custId)
      }
    )
  }

  fetchSubscription(custId:any){
this.registerService.getAllsubscription(custId).subscribe(
  (data:any)=>{
    this.allSubscription = data['data'];
  }
)
  }
  selectBrand(){
    this.registerService.selectBrand().subscribe(
      (data:any)=>{
        this.allBrand = data['data']
      }
    )
  }

  showBrandName(id:any){
    var brandName;
    brandName = this.allBrand.find((f:any)=>f.id==id).name;
    return brandName;

  }
}
