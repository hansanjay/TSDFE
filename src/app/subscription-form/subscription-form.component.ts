import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent implements OnInit {
  scheduleForm: FormGroup;
  subscriptionType:any[]=[
    
    {
      'id' :1, 
      'name': "Daily"
    },

    {
      'id':2,
      'name':'Weekly'

    },
    {
      'id':3,
      'name':'Monthly'

    }
    ]
  daysOfWeek: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  days = [1,2,3,4,5]
  statusOptions: any[] = [
    {
    id:0,
    name:'Inactive'
  },
  {
    id:1,
    name:'Active'
  }
]; // Example status options
  categoryOptions: any;
  subCategoryOptions: any;
  CategoryOptions1: any;
  custId: any;
  created_by: any;
  subType: any;
  allBrand: any;
  parentId: any;
  subCat: any;
  subId: any;
  selectedSubscription: any;

  constructor(private fb: FormBuilder,
    private registerService:RegisterService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private route : Router
  ) {

    
    this.scheduleForm = this.fb.group({
      brandId:[''],
      type: [''],
      productType:[''],
      day_of_week: [''],
      day_of_month: [''],
      status: [''],
      start: [''],
      stop: [''],
      // product_id: [''],
      quantity: [''],
      
      permanent: [false],
      visible: [false],
     
      category: [''],
      subCategory: [''],
    });
  }
  

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
       this.custId = param['custId'];
       this.created_by = param['created_by'];
       this.fetchCategory();
       this.selectBrand()
       this.fetchCategory()
       this.router.queryParams.subscribe(
        params => {
         
          this.subId =  params['subId'];
          if(this.subId){
            this.fetchSubscription(this.custId)
          }
        }
      )
      }
    )
 
  }
  fetchSubscription(custId:any){
    this.registerService.getAllsubscription(custId).subscribe(
      (data:any)=>{
        var selectedData = data['data']
        this.selectedSubscription = selectedData.find((f:any)=>f.id == this.subId);
       
        
      }
    )
      }
  
  fetchCategory(){
    this.registerService.fetchProductCategory().subscribe(
      (catData:any)=>{
        this.categoryOptions=catData['data']
      }
    )
  }
  fetchSubCategory(parentId:any){
    this.subCat = parentId
    this.registerService.fetchProductSubCategory(parentId).subscribe(
      (subCat)=>{
        this.subCategoryOptions = subCat['data'];
      }
    )
  }
  fetchCategories(parentId:any){
    this.parentId = parentId
    this.registerService.fetchProductSubCategory(parentId).subscribe(
      (subCat)=>{
        this.CategoryOptions1 = subCat['data'];
      }
    )
  }
  onSubmit(): void {
    if (this.scheduleForm.valid) {
      console.log('Form Submitted', this.scheduleForm.value);
      var finalObj = this.scheduleForm.value
      // "customer_id": 0,
  // "distributor_id": 0,
       finalObj['distributorId'] = this.created_by;
       finalObj['customerId'] = this.custId;
      //  finalObj['product_id'] = this.parentId;
      //  finalObj['type'] = this.subCat
      this.registerService.subscribeProd(finalObj).subscribe(
        (data:any)=>{
          this.toastr.clear();
          this.toastr.success('Subscribed successfully')
          this.route.navigate(['subscription-list', this.custId])
         
        }
      )
    } else {
      console.log('Form not valid');
    }
  }
  selectSubType(subType:any){
    this.subType = subType
  }
  selectBrand(){
    this.registerService.selectBrand().subscribe(
      (data:any)=>{
        this.allBrand = data['data']
      }
    )
  }

  modifySubscription(){
    if (this.scheduleForm.valid) {
      console.log('Form Submitted', this.scheduleForm.value);
  //     var finalObj = this.scheduleForm.value
  //     // "customer_id": 0,
  // // "distributor_id": 0,
  //      finalObj['distributorId'] = this.created_by;
  //      finalObj['customerId'] = this.custId;
      //  finalObj['product_id'] = this.parentId;
      //  finalObj['type'] = this.subCat
      this.registerService.modifysubscription(this.subId,this.scheduleForm.value).subscribe(
        (data:any)=>{
          this.toastr.clear();
          this.toastr.success('Subscription updated successfully')
         this.route.navigate(['subscription-list', this.custId])
        }
      )
    } else {
      console.log('Form not valid');
    }
  }
}