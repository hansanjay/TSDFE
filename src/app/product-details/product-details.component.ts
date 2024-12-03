import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  searchText:any;
Products: any;
  userData: any;
  allBrand: any;
  subCategoryOptions: any;
  CategoryOptions1: any;
  categoryOptions: any;
  constructor(
    private registerService:RegisterService
  ) { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('user')
    this.userData = JSON.parse(this.userData );
    this.selectBrand();
    this.fetchproductDetails()
    
  }

  fetchproductDetails(){
    this.registerService.fetchproducts().subscribe(
      (productData:any)=>{
        this.Products = productData.data;
        this.fetchCategory()
        this.Products.forEach((element:any) => {
          if(element.category){
           this.fetchSubCategory(element.category);
         
        }
        if(element.subCategory){
          this.fetchCategories(element.subCategory)
         }
        });
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

  returnBrandName(id:any){
   var brandName = this.allBrand.find((f:any)=>f.id==id).name;
   return brandName;
  }
  fetchSubCategory(parentId:any){
    this.registerService.fetchProductSubCategory(parentId).subscribe(
      (subCat)=>{
        this.subCategoryOptions = subCat['data'];
        var category = this.subCategoryOptions.find((f:any)=>f.parentId==parentId).name;
        return category
      }
    )
  }
  returnCategoryName(id:any){
    if(this.subCategoryOptions){
      var category = this.subCategoryOptions.find((f:any)=>f.parentId==id).name;
      return category
    }
    
  }
  fetchCategories(parentId:any){
    this.registerService.fetchProductSubCategory(parentId).subscribe(
      (subCat)=>{
        this.CategoryOptions1 = subCat['data'];
        // var subCategory = this.CategoryOptions1.find((f:any)=>f.id==parentId).name;
        // return subCategory
      }
    )
  }
  returnSubCategoryName(id:any){
if(this.CategoryOptions1){

  var subCategory = this.CategoryOptions1.find((f:any)=>f.parentId==id).name;
  return subCategory
}
  }


  fetchCategory(){
    this.registerService.fetchProductCategory().subscribe(
      (catData:any)=>{
        this.categoryOptions=catData['data']
      }
    )
  }
}
