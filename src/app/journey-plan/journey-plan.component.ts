import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-journey-plan',
  templateUrl: './journey-plan.component.html',
  styleUrls: ['./journey-plan.component.scss']
})
export class JourneyPlanComponent implements OnInit {
  distId: any;
  pincodes: any;
  pincodesDist: any;

  constructor(private fb: FormBuilder,
    private registerService:RegisterService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private route : Router
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
       this.distId = param['userId'];
       this.fetchPincodes(this.distId)
      })
    
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
}
