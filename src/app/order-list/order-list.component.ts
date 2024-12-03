import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  subscriptionId: any;
  allOrders: any;
  custData:any;

 
  constructor(private router:ActivatedRoute,
    private registerService:RegisterService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.custData = localStorage.getItem('customerDetails')
        this.custData = JSON.parse(this.custData );
    this.router.params.subscribe(
      (param)=>{
        this.subscriptionId = param['id'];

        // this.custId = param['custId']
        this.fetchOrders(this.subscriptionId)
      }
    )
  }

  fetchOrders(subId:any){
this.registerService.getAllOrders(subId).subscribe(
  (data:any)=>{
    this.allOrders = data['data'];
  }
)
  }
  statusupdate(orderId:any,status:any){
this.registerService.modifyOrders(orderId,status,'').subscribe(
  (data:any)=>{
this.toastr.clear();
this.toastr.success('Order status updated Successfully');
this.fetchOrders(this.subscriptionId)
  }
)
  }
}
