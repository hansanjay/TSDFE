import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { RegisterService } from './services/register.service';
import { ToastrService } from 'ngx-toastr';
// import $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'registration-form';
  searchKey: string = 'mobile';  // Default value for dropdown
  searchValue: string = '';      // Input value
  router: any;
  users: { key: string, value: string }[] = []; // Array to store added users
  enableLogin: boolean | any;
  routerurl: any;
  count=1;
  countP=1;
  countAgent = 1;
  countCust = 1;
  displayBlock: any;
  displayBlockP: any;
  displayBlockCust: any;
  displayBlockAgent: any;
  classnameP: any;
  classnameCust: any;
  classnameAgent: any;
  classnameAgentAgent: any;
  userData: any = null;
  constructor(private _router: Router,
    private registerService: RegisterService,
    private toastr: ToastrService
  ){

   console.log(this.userData);
   
   this.router = _router.url;
   this.userData = localStorage.getItem('user')
   this.userData = JSON.parse(this.userData );
   if(this.router=='/' && this.userData ){
    this.enableLogin = true
    //  this._router.navigate(['/dashboard'])
   }
  console.log(_router.url)
  _router.events.forEach((event) => {

    if(event instanceof NavigationStart) {
    this.userData = localStorage.getItem('user')
   this.userData = JSON.parse(this.userData );
      this.routerurl = event.url
      console.log(this.routerurl);
      if(event.url.includes('login')){
        this.enableLogin = true;
        // this.headerOptions.heading='Suite'
       
        
      }
      else{
        this.enableLogin = false;
      }
      if(this.routerurl=='/' && this.userData ){
        // this.enableLogin = true
         this._router.navigate(['/dashboard'])
       }
       if(this.routerurl=='/' && !this.userData ){
        this._router.navigate(['/login'])
       }
    }
  //   if(this.disableRightClick){
  //   if(event instanceof NavigationStart) {
  //     if(!event.url.includes('test')){
  //         this.rightClick.disableRightClick();
  //     }
  //   }
  // }
  });
  }
  searchUser() {
    if (this.searchValue.trim()) {
      this.users.push({ key: this.searchKey, value: this.searchValue });
      this.searchValue = '';  // Clear the input field after adding
    }
  }
  HandleSubMenuTrigger(){
  //  var element =  document.getElementById('pcoded-hasmenu').addCl;
   var x = document.getElementsByClassName('pcoded-hasmenu');
   var i;
   for (i = 0; i < x.length; i++) 
   {
      x[i].className += 'pcoded-trigger'; // WITH space added
   }
  }
  classname = '';
  enableSubMenu(clicked?:any){
    
    this.count = clicked+1
    // this.enableSubMenuP(this.countP+1)
    // this.enableSubMenuCust(this.countCust+1)
    // this.enableSubMenuAgent(this.countAgent+1)
    if(this.count % 2 === 0  ){
      this.classname='pcoded-trigger'
      this.displayBlock = 'block'
      return this.classname
    }
    else{
      this.displayBlock = 'none'
      return this.classname=''
    }
  }
  enableSubMenuP(clicked?:any){
    this.countP = clicked+1
    
    if(this.countP % 2 === 0  ){
      this.classnameP='pcoded-trigger'
      this.displayBlockP = 'block'
      return this.classname
    }
    else{
      this.displayBlockP = 'none'
      return this.classnameP=''
    }
  }
  enableSubMenuCust(clicked?:any){
    this.countCust = clicked+1
    
    if(this.countCust % 2 === 0  ){
      this.classnameCust='pcoded-trigger'
      this.displayBlockCust = 'block'
      return this.classnameCust
    }
    else{
      this.displayBlockCust = 'none'
      return this.classnameCust=''
    }
  }
  enableSubMenuAgent(clicked?:any){
    this.countAgent = clicked+1
    
    if(this.countAgent % 2 === 0  ){
      this.classnameAgent='pcoded-trigger'
      this.displayBlockAgent = 'block'
      return this.classnameAgent
    }
    else{
      this.displayBlockAgent = 'none'
      return this.classnameAgent=''
    }
  }
  logout(){
    this.toastr.clear();
    this.toastr.success('Logged out successfully')
    this.registerService.logout()
  }
  reloadComponent() {
    let currentUrl = this._router.url;
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate([currentUrl]);
    }
    Formfile: any;
    fileName: any;
    distId: any;
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
         this._router.navigate([['/journeyPlan',this.userData?.id]])
         this.reloadComponent()
        }
       )
    }  
}