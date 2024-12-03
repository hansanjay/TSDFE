import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-agent-registeraion',
  templateUrl: './agent-registeraion.component.html',
  styleUrls: ['./agent-registeraion.component.scss']
})
export class AgentRegisteraionComponent implements OnInit {

  
  CustRegistrationForm: FormGroup;
  activeOptions = [
    { value: true, display: 'True' },
    { value: false, display: 'False' }
  ];
  typeOptions = [
    { value: '2', display: 'customer' },
    { value: '3' , display: 'agent' }
  ];

country:any
state:any
locality:any 
  url:any
  statName: any;
  pincodes: any;
  userType: any;
  cityData: any;
  cities: any;
  userData: any;
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private registerServices : RegisterService,
    private router: ActivatedRoute,
    private route:Router,
    private toastr: ToastrService
  ) {
    this.router.params.subscribe(
      (param)=>{
        this.userType=''
        this.userType = param['userType']
        this.userData = localStorage.getItem('user')
        this.userData = JSON.parse(this.userData );
        // this.searchUser(this.searchKey,this.searchValue,this.userType);
        
      }
    )
    this.CustRegistrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      // username: ['', [Validators.required, Validators.minLength(3)]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Assuming 10-digit mobile number
      aadhar_card: [''],
      verification_expiry: [''],
      userType: [this.userType],
      distid:[this.userData.id],
      addressReq: this.fb.group({
        short_name: [''],
        line1: ['', Validators.required],
        line2: [''],
        line3: [''],
        geo_tag: [''],
        journey_id: [''], // Assuming a positive number
        country: ['', Validators.required],
        state_name: ['', Validators.required],
        city: ['', Validators.required],
        localityId: ['', Validators.required],
        address: ['', Validators.required],
        pin_code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]], // Assuming 6-digit PIN code
        verifiedAddress: [false],
        is_default: [false],
       
      }),
    });

    this.url=environment.basUrl
  }
  ngOnInit(): void {
    
    this.selectCountry();
    this.fetchPincodes(13)
  }
  countryName:any;
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
  onSubmit() {
    if (this.CustRegistrationForm.valid) {
      // this.CustRegistrationForm.value.addressReq['country'] = this.selectedCountry
      // this.CustRegistrationForm.value.addressReq['state_name'] = this.selectedState
      // this.CustRegistrationForm.value.addressReq['city'] = this.selectedCity
      if(this.userType=='customer'){
        this.CustRegistrationForm.value.userType = 2;
      }
      if(this.userType=='agent'){
        this.CustRegistrationForm.value.userType = 3;
      }
      this.registerServices.registerCustomer(this.CustRegistrationForm.value).subscribe(
        response => {
          console.log('User registered successfully', response);
          
          if(response.success==true){
            this.toastr.clear();
            this.toastr.success(this.userType + 'Created successfully')
            this.route.navigate(['/customersList/'+this.userData?.id+'/'+this.userType])
          }
          else{
           
            this.toastr.clear();
            this.toastr.warning(response.message)
          }
          // Handle success
        },
        error => {
          console.error('Error registering user', error);
          // Handle error
        }
      );
    } else {
      console.log('Form is invalid');
      this.validateAllFormFields(this.CustRegistrationForm);
    }
  }

  // Function to mark all fields as touched for validation
  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
      }
    });
  }
  fetchPincodes(distId:any){
    this.registerServices.fetchPinCode(distId).subscribe(
      (pincodes)=>{
        this.pincodes = pincodes.data
      }
    )

  }

}
