import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  distId: any;
  ratingOptions: number[] = [1, 2, 3, 4, 5];
  categoryOptions: any; 
  subCategoryOptions: any;
  returnPolicy:string[] = ['returnable','Non-returnable']
  CategoryOptions1: any;
  allBrand: any;
  userData: any;
  productid: any;
  Products: any;
  selectedProducts: any;
  unit:any
  unitDisplays=[{
    key:'gms',
    value:'Grams'
  },
  {
    key:'ml',
    value:'Mili litter'
  },
  {
    key:'kg',
    value:'Kilo grams'
  },
]
stdUnits=[{
  key:'100',
  value:'100'
},
{
  key:'200',
  value:'200'
},
{
  key:'250',
  value:'250'
},
{
  key:'500',
  value:'500'
},
{
  key:'1000',
  value:'1000'
},
]
  constructor(private fb: FormBuilder,
     private router:ActivatedRoute,
     private registerService: RegisterService,
     private toastr: ToastrService,
     private route: Router
  ) 
  {
    this.productForm = this.fb.group({
      brandId: ['', Validators.required],
      prdType: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      mrp: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      shelfLife: ['', Validators.required],
      unitDisplay: ['', Validators.required],
      ssu:['', Validators.required],
      unit: ['', Validators.required],
      discount: [''],
      packagingType: ['', Validators.required],
      return_policy: ['', Validators.required],
      features: ['', [Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
       this.distId = param['distId'];
       this.userData = localStorage.getItem('user')
       this.userData = JSON.parse(this.userData );
       this.fetchCategory();
       this.selectBrand();
       this.productid = undefined;
       this.Products=undefined;
      this.selectedProducts=undefined;
      if(this.selectedProducts==undefined){
        this.productForm.reset();
      }
      
      }
    )
    this.router.queryParams.subscribe(
      params => {
        console.log('Got the JWT as: ', params['jwt']);
        this.productid =  params['prodId'];
        if(this.productid){
          this.fetchproductDetails()
        }
        else{
          this.Products=undefined;
          this.selectedProducts=undefined;
        }
      }
    )
  }
  fetchproductDetails(){
    this.registerService.fetchproducts().subscribe(
      (productData:any)=>{
        this.Products = productData.data;
        this.selectedProducts = this.Products.find((f:any)=>f.id == this.productid)
       
        
      }
    )
  }
  onSubmit(): void {
    if (this.productForm.valid) {
      console.log('Form Submitted', this.productForm.value);
      this.registerService.addProduct(this.productForm.value).subscribe(
        (data)=>{
          this.toastr.clear();
          this.toastr.success('Product created successfully')
          this.route.navigate(['product-search'])
        }
      )
    } else {
      console.log('Form not valid');
    }
  }
  fetchCategory(){
    this.registerService.fetchProductCategory().subscribe(
      (catData:any)=>{
        this.categoryOptions=catData['data']
      }
    )
  }
  fetchSubCategory(parentId:any){
    this.registerService.fetchProductSubCategory(parentId).subscribe(
      (subCat)=>{
        this.subCategoryOptions = subCat['data'];
      }
    )
  }
  fetchCategories(parentId:any){
    this.registerService.fetchProductSubCategory(parentId).subscribe(
      (subCat)=>{
        this.CategoryOptions1 = subCat['data'];
      }
    )
  }
  selectBrand(){
    this.registerService.selectBrand().subscribe(
      (data:any)=>{
        this.allBrand = data['data']
      }
    )
  }
  onMOdify(): void {
    if (this.productForm.valid) {
      console.log('Form Submitted', this.productForm.value);
      this.registerService.modifyProduct(this.productid,this.productForm.value).subscribe(
        (data)=>{
          this.toastr.clear();
          this.toastr.success('Product updated successfully')
          this.route.navigate(['product-search'])
        }
      )
    } else {
      console.log('Form not valid');
    }
  }
}

