import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-user-type-details',
  templateUrl: './user-type-details.component.html',
  styleUrls: ['./user-type-details.component.scss']
})
export class UserTypeDetailsComponent implements OnInit {

  searchKey:any=0;  // pagecount
  searchValue:any=10;      // value count
  users: Array<any> = []; // Array to store user data
  activeStatus = [true,false]
  Formfile: any;
  fileName: any;
  distId: any;
  pincodes: any;
  searchText:any;
  pincodesDist: any;
  userType = [
    {
      key:2,
      value:'customer'
    },
    {
      key:3,
      value:'agent'
    }
    
  ]
  userT: any;
  allUsers: any;
  constructor(
    private registerService: RegisterService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(this.searchKey != 'All'){
      this.searchValue = ''
    }
    this.searchUser(this.searchKey,this.searchValue=10);
  }

  searchUser(searchKey:any,searchValue:any) {
    // this.users = this.allUser;
    this.registerService.searchDistributor(searchKey,searchValue).subscribe(
      (users:any)=>{
        this.users = users.data.content
      },error=>{
        console.error(error)
      }
    )
  }
  selectDist(value:any){
    console.log(value.target.value);
  this.distId = value.target.value;
  if(this.userT){
    this.selectUserType(this.userT,true)
  }
  }
  selectUserType(value:any,distFlag?:any){
  
  if(distFlag){
    this.userT = value;
  }
  else{
    this.userT = value.target.value;
  }
  this.registerService.viewUsrs(this.distId,this.userT).subscribe(
    (userData:any)=>{
      this.allUsers = userData['data']
      console.log(this.allUsers);
      
    }
  )
  }
}
