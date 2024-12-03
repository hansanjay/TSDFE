import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-allocate-customers',
  templateUrl: './allocate-customers.component.html',
  styleUrls: ['./allocate-customers.component.scss']
})
export class AllocateCustomersComponent implements OnInit {
  agentId: any;
  pincodes: any;
  currentPincode: any;
  locality: any;
  allocationForm:FormGroup
  localityId: any;
  custDetails: any;
  allData: any;
  selectedagent: any=[];
  custId: any;
  distId: any;
  custid: any;
  userType: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private registerServices : RegisterService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
  ) { 
      this.allocationForm = this.fb.group({
      agent_pincode: ['', Validators.required],
      local: ['', Validators.required],})
  }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param:any)=>{
       this.distId = param['distId'];
       this.custid = param['custId'];
       this.userType = param['userType'];
       this.fetchPincodes(this.distId)
      }
    )
  }
  fetchPincodes(agentId:any){
   
    this.registerServices.fetchPinCode(agentId).subscribe(
      (pincodes)=>{
        this.pincodes = pincodes.data;
        
        
      }
    )

  }

  selectPincodes(event:any){
  this.currentPincode = event;
   this.registerServices.fetchPincodes(this.currentPincode).subscribe(
    (pincodes:any)=>{
      this.locality = pincodes.data
    }
   )
  }
  fetchCustomerDetails(event:any){
    this.localityId = event;
    this.fetchCustomer()
    // this.registerServices.fetchCustomerDetails(this.localityId).subscribe(
    //   (cDetails:any)=>{
    //     this.custDetails = cDetails;
    //     console.log(this.custDetails);
        
    //   }
    // )
  }
  fetchCustomer()
  {
    this.registerServices.fetchAgentForLocality(this.currentPincode,this.localityId).subscribe(
      (pincodes:any)=>{
        this.allData = pincodes.data;
      
        console.log(this.allData);
        
      }
     )
  }
  saveAgent(){
    // this
    this.registerServices.CustAgentPinCodeMapping(this.selectedagent).subscribe(
      (data:any)=>{
        this.toastr.clear();
        this.toastr.success('pincode allocated')
        
      }
    )
  }
  selectagent(agent:any){
    var valueObject = {
    "agentId": agent.agentId,
    "custId": this.custId,
    "localityId": this.localityId,
    "pincode": agent. pincode

    }
   this.selectedagent.push(agent);
  }
}
