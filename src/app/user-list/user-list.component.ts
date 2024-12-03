import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  searchKey: string = 'All';  // Default value for dropdown
  searchValue: string = 'All';      // Input value
  users: Array<any> = []; // Array to store user data
  activeStatus = [true,false]
  Formfile: any;
  fileName: any;
  distId: any;
  pincodes: any;
  searchText:any;
  pincodesDist: any;
  userType = ['Customer','Agent']
  userData: any;
  constructor(
    private registerService: RegisterService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('user')
    this.userData = JSON.parse(this.userData);
    if(this.searchKey != 'All'){
      this.searchValue = ''
    }
    this.searchUser(this.searchKey,this.searchValue);
  }

  searchUser(searchKey:any,searchValue:any) {
    // this.users = this.allUser;
    this.registerService.searchDistributor(0,10).subscribe(
      (users:any)=>{
        this.users = users.data.content
      },error=>{
        console.error(error)
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
    console.log('User saved:', user);
    // append and split first name and last name
    user.last_updated_by=this.userData.id,
    this.registerService.modifyDist(user.mobile,user).subscribe(
      (userData:any)=>{
        user = userData.data;
        this.toastr.clear();
        this.toastr.success(userData.message)
      }
    )
    // Implement logic to persist the changes, e.g., send data to a backend
  }
  upload(event:any) {
    // this.distId = distId
    this.Formfile = event.target.files[0];
    this.fileName = this.Formfile.name;
    console.log(this.Formfile.name);
    
  }
  captureDistId(distId:any){
    this.distId = distId;
  }
  onImport() {
    if (this.Formfile == undefined) {
      return;
    }
    //console.log("inside upload");
    var fd = new FormData();
    fd.append('file', this.Formfile);
     console.log('file',fd);
     this.registerService.uploadPinCode(this.distId,fd).subscribe(
      (pincodes:any)=>{
        this.toastr.clear();
        this.toastr.success('Uploaded successfully')
       
      }
     )
  }  

  fetchPincodes(distId:any){
    this.registerService.fetchPinCode(distId).subscribe(
      (pincodes)=>{
        this.pincodes = pincodes.data
        this.pincodesDist =  this.pincodes.map((m:any)=>{
          return {
        'pincode':m[0],
         'locality':m[1]
        };
      })
        console.log(this.pincodes);
        
      }
    )

  }
  getIconColor(active:boolean){
  if(active){
    return 'bg-label-success'
  }
  else{
    return 'bg-label-danger'
  }
  }
}
