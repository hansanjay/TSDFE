import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  editAddForm: FormGroup;
  addressDetails: any;
  country: any;
  mobile: any;
  custId: any;
  state: any;
  cities: any;
  locality: any;
  addressId: any;
  selectedAddress: any;

  constructor(
    private fb:FormBuilder,
    private registerServices:RegisterService,
    private router:ActivatedRoute,
    private route:Router,
    private toastr:ToastrService
  ) { 
    this.editAddForm = this.fb.group({
      short_name: [''],
        line1: ['',],
        line2: [''],
        geo_tag: [''],
        journey_id: [''],
        country: ['',],
        state_name: [''],
        city: [''],
        localityId: [''],
        address: [''],
        pin_code: [''], // assuming 6-digit PIN code
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
        this.mobile = param['mobile'];
        this.custId = param['custId']
        this.addressId = param['userId']
        this.selectCountry()
        this.fetchAddress(this.mobile)
      }
    )

  }
  fetchAddress(mobile:any){
    this.registerServices.fetchAddress(mobile).subscribe(
      (address:any)=>{
        this.addressDetails = address['data']
        this.selectedAddress = this.addressDetails.find((f:any)=>f.id==this.addressId)
        
        // this.addressDetails.forEach((element:any) => {
        //   element.isEditing = false;
        //   // if(element.state_name){
        //     this.selectState(element.country)
        //     this.selectCity(element.state_name)
        //     this.selectLocality(element.city)
        //   // }
        // });
      }
    )
  }

  selectCountry(){
    this.registerServices.selectCountry().subscribe((countryData)=>{
      this.country = countryData
     })
      
  
  }
  selectState(countyCode:any){
    // this.selectedCountry = this.country?.data.find((f:any)=>f.countryCode == countyCode).countryName;
   this.registerServices.selectState(countyCode).subscribe((statesData)=>{
    this.state = statesData
   })
    
  
  }
  selectCity(stateCode:any){
    // this.selectedState = this.state?.data.find((f:any)=>f.id == stateCode).stateName;
    this.registerServices.selectCity(stateCode).subscribe((localData:any)=>{
     this.cities = localData.data
    })
  }
  selectLocality(cityId:any){
    // this.selectedCity = this.cities.find((f:any)=>f.id == cityId).cityName;
    this.registerServices.selectLocal(cityId).subscribe((localData:any)=>{
      this.locality = localData.data
     })
  }
  modifyAddress(){
    // console.log(add);
    // add.isEditing = false;
    this.registerServices.modifyAdd(this.selectedAddress.id,this.selectedAddress).subscribe(
      (data:any)=>{
        this.toastr.clear();
        this.toastr.success('Address updated successfully');
        this.route.navigate(['/address',this.mobile,this.custId])
      }
    )
  }
}
