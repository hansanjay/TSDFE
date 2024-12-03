import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
 
  url:any
  portEnable: boolean;
  constructor(
    private http:HttpClient,
    private router:Router
  ) { 
  this.url = environment.basUrl
  this.portEnable = environment.portEnable;
  }

  
  registerCustomer(userData: any): Observable<any> {
    if(this.portEnable){
      return this.http.post<any>(this.url + '8183/api/v1/tsd/cust/register', userData);
    }
    else{
      return this.http.post<any>(this.url + '/api/v1/tsd/cust/register', userData);
    }
  }
 
  selectCountry(){
    if(this.portEnable){
      return this.http.get(this.url + '8182/api/v1/tsd/master/getcountries/0')
    }
   else{
    return this.http.get(this.url + '/api/v1/tsd/master/getcountries/0')
   }
  }
  selectState(code: any){
    if(this.portEnable){
      return this.http.get(this.url + '8182/api/v1/tsd/master/states/' + code)
    }
    else{
      return this.http.get(this.url + '/api/v1/tsd/master/states/' + code)
    }
   
  }
  selectCity(Scode: any){
    if(this.portEnable){
      return this.http.get(this.url + '8182/api/v1/tsd/master/city/' + Scode)
    }
    else{
      return this.http.get(this.url + '/api/v1/tsd/master/city/' + Scode)
    }
  }
  selectLocal(cityId: any){
    if(this.portEnable){
      return this.http.get(this.url + '8182/api/v1/tsd/master/locality/cityId/' + cityId)
    }
    else{
      return this.http.get(this.url + '/api/v1/tsd/master/locality/cityId/' + cityId)
    }
  }
  fetchPincodes(pincode:any){
    if(this.portEnable){
      return this.http.get(this.url + '8182/api/v1/tsd/master/locality/pincode/' +   pincode)
    }
    else{
      return this.http.get(this.url + '/api/v1/tsd/master/locality/pincode/' +   pincode)
    }
   // 8082/api/v1/tsd/locality/pincode/<pincode>
   
  }
  fetchCustomerDetails(localityId:any){
    if(this.portEnable){
      return this.http.get(this.url + '8184/api/v1/tsd/add/fetchCustForLocality/' +   localityId)
    }
    else{
      return this.http.get(this.url + '/api/v1/tsd/add/fetchCustForLocality/' +   localityId)
    }
  }
//Distributor Api
  searchDistributor(key:any,value:any){
    if(this.portEnable){
      return this.http.get(this.url + '8181/api/v1/tsd/dist/fetchAll/' + key + '/'+ value)
    }
    else{
      return this.http.get(this.url + '/api/v1/tsd/dist/fetchAll/'+ key + '/'+ value)
    }
    
  }
  modifyDist(mobile:any , user:any){
    ///update/{mobilenumber}
    if(this.portEnable){
      return this.http.put(this.url + '8181/api/v1/tsd/dist/update/' + mobile, user)
    }
    else{
      return this.http.put(this.url + '/api/v1/tsd/dist/update/' + mobile, user)
    }
    
  }
  registerDistributor(userData: any): Observable<any> {
    if(this.portEnable){
      return this.http.post<any>(this.url + '8181/api/v1/tsd/dist/registerDist', userData);
    }
    else{
      return this.http.post<any>(this.url + '/api/v1/tsd/dist/registerDist', userData);
    }
  }

  modifyUser(key:any,value:any){
    if(this.portEnable){
      return this.http.patch(this.url + '8183/api/v1/tsd/cust/update/' + key, value)
    }
    else{
      return this.http.patch(this.url + '/api/v1/tsd/cust/update/' + key, value)
    }
  }
  searchUser(key:any,usertype:any){
    if(this.portEnable){
      return this.http.get(this.url + '8183/api/v1/tsd/cust/fetch/' + key  + '/'+usertype)
    }
    else{
      return this.http.get(this.url + '/api/v1/tsd/cust/fetch/' + key + '/'+usertype)
    }
  }
  getUserByMobile(usertype:any,mobile:any){
    //api/v1/tsd/cust/getCustDetails/{userType}/{mobile}
    if(this.portEnable){
      return this.http.get(this.url + '8183/api/v1/tsd/cust/getCustDetails/' + usertype +'/'+mobile)
    }
    else{
      return this.http.get(this.url + '/api/v1/tsd/cust/getCustDetails/' + usertype +'/'+mobile)
    }
  }
 uploadPinCode(distId:any,file:any){
  ///api/v1/tsd/pincode/upload/{distId}
  if(this.portEnable){
    return this.http.post<any>(this.url + '8182/api/v1/tsd/master/pincode/upload/'+distId, file);
  }
  else{
    return this.http.post<any>(this.url + '/api/v1/tsd/master/pincode/upload/'+distId, file);
  }
 }
 fetchPinCode(distId:any){
  if(this.portEnable){
    return this.http.get<any>(this.url + '8182/api/v1/tsd/master/pincode/fetch/'+distId);
  }
  else{
    return this.http.get<any>(this.url + '/api/v1/tsd/master/pincode/fetch/'+distId);
  }
  ///api/v1/tsd/pincode/upload/{distId}
  
 }
 allocatePincode(pincodes:any){
  if(this.portEnable){
    return this.http.post<any>(this.url + '8182/api/v1/tsd/master/pincode/agentPinCodeMapping' , pincodes)
  }
  else{
    return this.http.post<any>(this.url + '/api/v1/tsd/master/pincode/agentPinCodeMapping' , pincodes)
  }
}

fetchAgentsPincodes(agentId:any){
  if(this.portEnable){
    return this.http.get<any>(this.url + '8182/api/v1/tsd/pincode/fetchAgentPinCode/'+agentId);

  }
  else{
    return this.http.get<any>(this.url + '/api/v1/tsd/pincode/fetchAgentPinCode/'+agentId);

  }
  //api/v1/tsd/pincode/fetchAgentPinCode/{agentId}
  }
  fetchCustomerPincodes(pincodes: any) {
    //api/v1/tsd/pincode/{pincode}
    //api/v1/tsd/add/fetchAgentForLocality/{pincode}/{localityId}
    if (environment.production == false) {
      return this.http.get<any>(this.url + '8182/api/v1/tsd/master/pincode/' + pincodes);
    }
    else {
      return this.http.get<any>(this.url + '/api/v1/tsd/master/pincode/' + pincodes);
    }

}
fetchAgentForLocality(pincode:any,localityId:any){
  if(this.portEnable){
    return this.http.get<any>(this.url + '8184/api/v1/tsd/add/fetchAgentForLocality/'+pincode + '/' + localityId);
  }
  else{
    return this.http.get<any>(this.url + '/api/v1/tsd/add/fetchAgentForLocality/'+pincode + '/' + localityId);
  }
  
}
login(value: any){
  ///api/v1/tsd/auth
  if(this.portEnable){
    return this.http.post(this.url + '8185/api/v1/tsd/user/auth', value)
  }
  else{
    return this.http.post(this.url + '/api/v1/tsd/user/auth', value)
  }
 
}
fetchCustomerAdd(mobile:any){
  //api/v1/tsd/add/fetch/{mobile}
  if(this.portEnable){
    return this.http.get<any>(this.url + '8184/api/v1/tsd/add/fetch/'+mobile);
  }
  else{
    return this.http.get<any>(this.url + '/api/v1/tsd/add/fetch/'+mobile);
  }
}
//http://localhost:8182/api/v1/tsd/pincode/201301
selectAgent(customerPincode:any,localityId?:any){
  if(this.portEnable){
    return this.http.get<any>(this.url + '8182/api/v1/tsd/master/pincode/'+customerPincode + '/' +localityId);
  }
  else{
    return this.http.get<any>(this.url + '/api/v1/tsd/master/pincode/'+customerPincode + '/' +localityId);
  }
  
}
///CustAgentPinCodeMapping
CustAgentPinCodeMapping(value:any){
  if(this.portEnable){
    return this.http.post(this.url + '8182/api/v1/tsd/master/pincode/custAgentPinCodeMapping', value) 
  }
  else{
    return this.http.post(this.url + '/api/v1/tsd/master/pincode/custAgentPinCodeMapping', value) 
  }
}
// product Api

fetchproducts(){
  //api/v1/tsd/prd/fetch
  if(this.portEnable){
    return this.http.get<any>(this.url + '8186/api/v1/tsd/master/prd/fetch/All');
  }
  else{
    return this.http.get<any>(this.url + '/api/v1/tsd/master/prd/fetch/All');
  }

}

fetchProductCategory(){
  //http://10.10.5.3:8182/api/v1/tsd/product/catalogue
  if(this.portEnable){
    return this.http.get<any>(this.url + '8182/api/v1/tsd/master/product/catalogue/All');
  }
  else{
     return this.http.get<any>(this.url + '/api/v1/tsd/master/product/catalogue/All');
  }
 
}
fetchProductSubCategory(parentId:any){
  //http://10.10.5.3:8182/api/v1/tsd/product/catagory/{parentId}
  if(this.portEnable){
    return this.http.get<any>(this.url + '8182/api/v1/tsd/master/product/catagory/' + parentId);
  }
  else{
    return this.http.get<any>(this.url + '/api/v1/tsd/master/product/catagory/' + parentId);
  }
}
addProduct(value:any){
//api/v1/tsd/prd/create
if(this.portEnable){
  return this.http.post(this.url + '8186/api/v1/tsd/master/prd/create', value)
}
else{
  return this.http.post(this.url + '/api/v1/tsd/master/prd/create', value)
}
}

fetchAddress(mobile: any) {
  //api/v1/tsd/add/fetch/{mobile}
  if(this.portEnable){
    return this.http.get(this.url + '8184/api/v1/tsd/add/fetch/' + mobile)
  }
  else{
    return this.http.get(this.url + '/api/v1/tsd/add/fetch/' + mobile)
  }
  
}
///api/v1/tsd/subs/create
subscribeProd(value:any){
  if(this.portEnable){
    return this.http.post(this.url + '8187/api/v1/tsd/master/subs/create', value)
  }
  else{
    return this.http.post(this.url + '/api/v1/tsd/master/subs/create', value)
  }
}

convertArrayObj(array:any){
array.map((m:any)=>{
    return {
  'pincode':m[0],
   'locality':m[1]
  };
})
}
logout() {
  localStorage.removeItem('user');
  this.router.navigate(['/login'])
}

viewUsrs(distid:any,userType:any){
  //api/v1/tsd/cust/fetch/{distid}/{userType}
  if(this.portEnable){
    return this.http.get(this.url + '8184/api/v1/tsd/cust/fetch/' + distid + '/' + userType)
  }
  else{
    return this.http.get(this.url + '/api/v1/tsd/cust/fetch/' + distid + '/' + userType)
  }
}
selectBrand(){
  //https://app.thesmartdelivery.in/api/v1/tsd/prd/fetchBrand/All
  return this.http.get(this.url + '/api/v1/tsd/master/prd/fetchBrand/All')
}
//api/v1/tsd/cust/fetchAgentByCustbyId/{custid}

fetchAgent(custid:any){
  return this.http.get(this.url + '/api/v1/tsd/master/create/fetchagentforcust/' + custid)
}

fetchCustomer(agentId: any) {
  return this.http.get(this.url + '/api/v1/tsd/master/create/fetchcustforagent/' + agentId)
}

modifyAdd(addressId:any,addObj:any){
 //api/v1/tsd/add//modify/{addressId}
 return this.http.put(this.url + '/api/v1/tsd/add/modify/'+addressId, addObj)
}
getAllsubscription(custId:any){
  return this.http.get(this.url + '/api/v1/tsd/master/subs/fetch/' + custId)
}

modifysubscription(subId:any,value:any){
  return this.http.put(this.url + '/api/v1/tsd/master/subs/modify/' + subId,value)
}

getAllOrders(subId:any){
  return this.http.get(this.url + '/api/v1/tsd/master/order/fetch/' + subId)
}

modifyOrders(orderId:any, status:any,value:any){
  //api/v1/tsd/order/status/{orderid}/{status}
  return this.http.put(this.url + '/api/v1/tsd/master/order/status/' + orderId + '/'+ status,value)
}

showName(entity:any,id:any){
//api/v1/tsd/state/
return this.http.get(this.url + '/api/v1/tsd/master/fetchadd/' + entity + '/' + id)

}
modifyProduct(productid:any,value:any){
  return this.http.put(this.url + '/api/v1/tsd/master/prd/modify/' + productid ,value)
}

}
