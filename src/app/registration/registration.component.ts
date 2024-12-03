import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

 
  registrationForm: FormGroup;
  activeOptions = [
    { value: true, display: 'True' },
    { value: false, display: 'False' }
  ];
country:any
state:any
locality:any
 // Dropdown options
 countries = ['India', 'United States', 'United Kingdom', 'Australia'];
 states = {
   India: ['Delhi', 'Maharashtra', 'Karnataka'],
   'United States': ['California', 'Texas', 'New York'],
   'United Kingdom': ['England', 'Scotland', 'Wales'],
   Australia: ['New South Wales', 'Victoria', 'Queensland']
 };
 cities:any

 selectedStates = [];
 selectedCities = [];
  url:any
  statName: any;
  selectedCountry: any;
  selectedState: any;
  selectedCity: any;
  userData: any;
  mobileNumber: any;
  userId: any;
  distList: any;
  selecteduser: any;
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private registerServices : RegisterService,
    private router:Router,
    private toastr: ToastrService,
    private _router:ActivatedRoute,
  ) {
    this.userData = localStorage.getItem('user')
    this.userData = JSON.parse(this.userData);
    this.registrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      pannum: ['', [Validators.required]],
      gstin: ['', [Validators.required]],
      companyName:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // assuming 10-digit mobile number
      active: [false],
      enable: [false],
      created_by:[this.userData.id],
      last_updated_by: [this.userData.id],
      addressReq: this.fb.group({
        short_name: [''],
        line1: ['', Validators.required],
        line2: [''],
        geo_tag: [''],
        journey_id: [''],
        country: ['', Validators.required],
        state_name: ['', Validators.required],
        city: ['', Validators.required],
        localityId: ['', Validators.required],
        address: ['', Validators.required],
        pin_code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]], // assuming 6-digit PIN code
        // is_verified: [false],
        // is_default: [false],
      }),

    });
  

    this.url=environment.basUrl
  }

  // ngOnInit(): void {
  

    // Update states and cities based on selected country and state
    // this.registrationForm.get('addressReq.country').valueChanges.subscribe(country => {
    //   this.selectedStates = this.states[country] || [];
    //   this.selectedCities = [];
    //   this.registrationForm.get('addressReq.state_name').setValue('');
    //   this.registrationForm.get('addressReq.city').setValue('');
    // });

    // this.registrationForm.get('addressReq.state_name').valueChanges.subscribe(state => {
    //   this.selectedCities = this.cities[state] || [];
    //   this.registrationForm.get('addressReq.city').setValue('');
    // });
  // }

  onSubmit() {
    if (this.registrationForm.valid) {
      
      // console.error('Error registering user', this.registrationForm.value)
      // this.registrationForm.value.addressReq['country'] = this.selectedCountry
      // this.registrationForm.value.addressReq['state_name'] = this.selectedState
      // this.registrationForm.value.addressReq['city'] = this.selectedCity
      this.registerServices.registerDistributor(this.registrationForm.value).subscribe(
        response => {
          console.log('User registered successfully', response);
          if(response.success==true){
            this.toastr.clear();
            this.toastr.success('User registered successfully')
           this.router.navigate(['/Distributor'])
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
      this.validateAllFormFields(this.registrationForm);
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
  ngOnInit(): void {
    this.selectCountry();
    this._router.queryParams.subscribe(
      params => {
        console.log('Got the JWT as: ', params['jwt']);
        this.userId =  params['userId'];
        if(this.userId){
          this.getAllUsers()
        }
        else{
          // this.Products=undefined;
          // this.selectedProducts=undefined;
          this.selecteduser = undefined
          this.distList = undefined
        }
      }
    )
  }
getAllUsers(){
  this.registerServices.searchDistributor(0,10).subscribe(
    (users:any)=>{
      this.distList = users.data.content;
      this.selecteduser = this.distList.find((f:any)=>f.id=this,this.userId)
    },error=>{
      console.error(error)
    }
  )
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
searchKey: string = 'mobile';  // Default value for dropdown
  searchValue: string = '';      // Input value
  users: Array<any> = []; // Array to store user data

  // Sample data (you can replace this with actual data fetching logic)
  allUsers = [
    {
      userName: "rahulsharma",
      password: "Abhi@123",
      securityQuestion: "abc",
      securityAnswer: "abc",
      companyCode: "11",
      companyName: "Rajeev Milk Service",
      address: "Noida",
      country: "India",
      state: "UP",
      city: "Noida",
      pinCode: "201310",
      contactPersonName: "Rajeev Gupta",
      mobileNo: "9876543210",
      email: "abct@test.com",
      pannum: "ABCDE1234F",
      gstin: "22AAAAA0000A1Z5",
      isEditing: false
    }
    // Add more user objects as needed
  ];
  allUser= 
  [
{
    "id": 1,
    "first_name": "Rahul",
    "last_name": "Sharma",
    "username": "rahulsharma",
    "password": "Abhi@123",
    "security_question": "What is your pet's name?",
    "security_answer": "Fluffy",
    "company_code": "11",
    "company_name": "Rajeev Milk Service",
    "contact_person_name": "Rajeev Gupta",
    "email": "abct@test.com",
    "pannum": "ABCDE1234F",
    "gstin": "22AAAAA0000A1Z5",
    "active": false,
    "enabled": false,
    "created_on": "2024-08-29T08:02:49.138+00:00",
    "last_updated_on": "2024-08-29T08:02:49.139+00:00",
    "created_by": "Admin",
    "last_updated_by": "Admin",
    "mobile": "9876543210",
    "addresses": [
        {
            "id": 1,
            "short_name": "Office",
            "line1": "123 Milk Lane",
            "line2": "Suite 456",
            "line3": "",
            "address": "123 Milk Lane, Suite 456, Dairy Town",
            "country": "India",
            "city": "Dairy Town",
            "state_name": "StateName",
            "geo_tag": "12.3456, 78.9012",
            "pin_code": "123456",
            "defaultAddress": true,
            "journey_id": null,
            "verifiedAddress": true,
            "mobile": "9876543210",
            "distributor": null,
            "customer": null
        }
    ]
}
]
  searchUser() {
    if (this.searchKey === 'All') {
      this.users = this.allUser;
    } else {
      this.users = this.allUsers.filter((user:any) => user[this.searchKey] === this.searchValue);
    }

    this.registerServices.searchDistributor(this.searchKey,this.searchValue).subscribe(
      (users:any)=>{
        this.users = users.data;
      }
    )
  }

  addUser() {
    // Implement the logic to add a new user
    console.log('Add user button clicked');
  }

  editUser(user: any) {
    user.isEditing = true;
  }

  saveUser(user: any) {
    user.isEditing = false;
    console.log('User saved:', user);
    this.registerServices.modifyDist(user.mobile,user).subscribe(
      (user:any)=>{
        this.users = user.data
      }
    )
    // Implement logic to persist the changes, e.g., send data to a backend
  }
}
