import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {
  mobile: any;
  addressDetails: any;
  agentPincode: any;
  agentId: any;
  custId: any;
  name: any;
  country: any;
  state: any;
  cities: any;
  locality: any;
  // editAddForm:FormGroup;
// showState: any;
enableSelect = false
  constructor(private router:ActivatedRoute,
    private registerService:RegisterService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) { 
   
   
  }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
        this.mobile = param['mobile'];
        this.custId = param['custId']
       
        this.selectCountry()
        this.fetchAddress(this.mobile)
      }
    )

    
  }
fetchAddress(mobile:any){
  this.registerService.fetchAddress(mobile).subscribe(
    (address:any)=>{
      this.addressDetails = address['data']
      this.addressDetails.forEach((element:any) => {
        element.isEditing = false;
        // if(element.state_name){
          this.selectState(element.country)
          this.selectCity(element.state_name)
          this.selectLocality(element.city)
        // }
      });
    }
  )
}
fetchAgentPincodes(pincode:any,localityId:any){
  this.registerService.selectAgent(pincode,localityId).subscribe(
    (agentPincodes)=>{
      this.agentPincode = agentPincodes.data
    }
  )
  }
  selectAgentId(agentId:any){
  this.agentId = agentId.target.value;
  }
  saveAllocation(add:any){
var obj = {
  "agentId": this.agentId,
  "custId": this.custId,
  "addressId": add.id,
  "pincode": add.pin_code
}
this.registerService.CustAgentPinCodeMapping(obj).subscribe(
  (data:any)=>{
    this.toastr.clear();
    this.toastr.success('Pincode allocated successfully')
    
  }
)
  }
  editAdd(add:any){
    add.isEditing = true;
  }
  modifyAddress(add:any){
    console.log(add);
    add.isEditing = false;
    this.registerService.modifyAdd(add.id,add).subscribe(
      (data:any)=>{
        this.toastr.clear();
        this.toastr.success('Address updated successfully');
      }
    )
  }
  verifiedValue = [
    {
    key:true,
    value:'Approved'
  },
  {
    key:false,
    value:'Pending'
  }
]

showName1(entity:any,id:any){
  // var name:any ;
this.registerService.showName(entity,id).subscribe(
  (data:any)=>{
    this.name = data['data'];
    // return this.name;
  }

)

}

countryName:any;
selectCountry(){
  this.registerService.selectCountry().subscribe((countryData)=>{
    this.country = countryData
   })
    

}
selectState(countyCode:any){
  // this.selectedCountry = this.country?.data.find((f:any)=>f.countryCode == countyCode).countryName;
 this.registerService.selectState(countyCode).subscribe((statesData)=>{
  this.state = statesData
 })
  

}
selectCity(stateCode:any){
  // this.selectedState = this.state?.data.find((f:any)=>f.id == stateCode).stateName;
  this.registerService.selectCity(stateCode).subscribe((localData:any)=>{
   this.cities = localData.data
  })
}
selectLocality(cityId:any){
  // this.selectedCity = this.cities.find((f:any)=>f.id == cityId).cityName;
  this.registerService.selectLocal(cityId).subscribe((localData:any)=>{
    this.locality = localData.data
   })
}
showState(id:any){

  var statename = this.state?.data.find((f:any)=>f.id==id).stateName;
 return statename
}

showCity(id:any){
  if(this.cities){
    var cityname = this.cities.find((f:any)=>f.id==id).cityName
    return cityname
  }

}
showLocality(id:any){
  if(this.locality){
    var localityname = this.locality.find((f:any)=>f.id==id).localityName
    return localityname
  }
  }
 

}
