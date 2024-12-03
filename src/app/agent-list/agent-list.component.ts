import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {

  searchKey: string = 'All';  // Default value for dropdown
  searchValue: string = 'All';      // Input value
  users: any
  activeStatus = [true,false]
  pincodes: any;
  selectedPincodes: any=[];
  agentId: any;
  userType: any;
  searchText:any;
  distId: any;
  agentPincodes: any;
  picnCollection: any=[];
  custpincodes: any;
  customerAddress: any;
  agentPincode: any;
  assignedpincodes: any;
  customerAddObj: any;
  selectedPincode: any;
  customerId: any;
  // value: { agentid: any; custid: any; pincode: any; };
  valueCust: any;
  pincodesAgent: any;
  agentByCustomer: any;
  constructor(
    private registerService: RegisterService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
        this.userType = param['userType'];
        this.distId = param['distId']
        if(this.userType=='customer'){
          this.userType = 2
          this.users=undefined
          this.searchText=undefined
        }
        else if(this.userType=='agent')
        {
          this.userType = 3
          this.users=undefined;
          this.searchText=undefined
        }
        // this.searchUser(this.distId,this.userType);
      }
    )
    if(this.searchKey != 'All'){
      this.searchValue = ''
    }
  }
  searchAgent(userType:any){
     this.userType = userType
  }
  searchUser(searchKey:any,userType:any) {
    this.registerService.searchUser(searchKey,userType).subscribe(
      (users:any)=>{
        this.users = users.data
        console.log(users)
      }
    )
  }

  getUserByMobile(userType:any,mobile:any){
    //api/v1/tsd/cust/getCustDetails/{userType}/{mobile}
    this.registerService.getUserByMobile(userType,mobile).subscribe(
      (users:any)=>{
        this.users = users.data
        if(users.success_code != 200){
          this.toastr.clear();
          this.toastr.warning(users.message);
        }
        console.log(users)
      }
    )
  }

  addUser() {-
    // Implement the logic to add a new user
    console.log('Add user button clicked');
  }

  editUser(user: any) {
    user.isEditing = true;
  }

  saveUser(user: any) {
    user.isEditing = false;
   
      user['userType'] = this.userType;
   
    this.registerService.modifyUser(user.mobile,user).subscribe(
      (user : any) => {
      // this.users=user.data;
      this.toastr.clear();
      this.toastr.success('Agent updated successfully')
      //  this.searchUser(this.searchKey,this.userType);
      }
    )
  }

  fetchPincodes(distId:any,agentId:any){
    this.distId = distId;
    this.agentId = agentId
    this.selectedPincodes = []
    this.registerService.fetchPinCode(this.distId).subscribe(
      (pincodes)=>{
        this.pincodes = pincodes.data;
       this.pincodesAgent = this.pincodes.map((m:any)=>{
          return {
        'pincode':m[0],
         'locality':m[1],
         'localityId':m[2]
        };
      })
        
      }
    )

  }
  selectPinCodes(pincode:any){
   var obj =  {
      "agentId": this.agentId,
      "pincode": pincode.pincode,
      "localityId": pincode.localityId
    }
   this.selectedPincodes.push(obj)
  }
  allocatePinCode(){
    this.registerService.allocatePincode(this.selectedPincodes).subscribe(
      (data)=>{
        this.toastr.clear();
        this.toastr.success('Pincode Allocated ')
      }
    )
  }
  fetchAgentId(agentId:any){
  this.agentId = agentId
  }

  getAllocatedPincodes(agentId:any){
    this.registerService.fetchAgentsPincodes(agentId).subscribe(
      (agentpins:any)=>{
        this.agentPincodes = agentpins.data;
        this.picnCollection = this.agentPincodes.map((m:any)=>{
          return {
        'pincode':m[0],
         'locality':m[1],
         'localityId':m[2]
        };
      })
       
      }
    )
  }
 fetchCustomer(pincodes:any){
  this.registerService.fetchAgentsPincodes(pincodes).subscribe(
    (pincodes)=>{
      this.custpincodes = pincodes.data
    }
  )
 }
 fetchCustomerAddress(mobile:any,customerId?:any){
  this.customerId = customerId;
  this.registerService.fetchCustomerAdd(mobile).subscribe(
    (address)=>{
      this.customerAddress = address.data;
      this.customerAddress.forEach((element:any) => {
        this.fetchCustomerPincodes(element.pin_code)
      });
   
    }
  )
 }
fetchCustomerPincodes(pincode:any){
this.registerService.selectAgent(pincode).subscribe(
  (agentPincodes)=>{
    this.agentPincode = agentPincodes.data
  }
)
}
caputreCustomerData(add:any){
  console.log(add);
this.customerAddObj = add
}
caputrePincode(event:any){

this.assignedpincodes = event.target.innerText
}
assignAgentPincodes(){
  this.valueCust = {
    "agentId": this.agentPincode[0].agentId,
    "custId": ""+this.customerId,
    "pincode": this.agentPincode[0].pincode

  }
this.registerService.CustAgentPinCodeMapping(this.valueCust).subscribe(
  (data:any)=>{
   this.toastr.clear()
   this.toastr.success('Pincode allocated successfully')
    this.valueCust = undefined
  }
)
}

fetchAgent(custId:any){
  this.registerService.fetchAgent(custId).subscribe(
    (data:any)=>{
      this.agentByCustomer = data['data']
      console.log(this.agentByCustomer);
      
    }
  )
}

getCustomerDetails(user:any){
localStorage.setItem('customerDetails', JSON.stringify(user));
this.route.navigate(['/subscription-list',user.id])
}
}
