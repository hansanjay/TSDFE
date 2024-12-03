import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agent-cust',
  templateUrl: './agent-cust.component.html',
  styleUrls: ['./agent-cust.component.scss']
})
export class AgentCustComponent implements OnInit {
  agentid: any;
  allCustomer: any;

  constructor(
    private registerService: RegisterService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      (param)=>{
        this.agentid = param['agentid']
      this.fetchCustomer(this.agentid)
      }
    )
  
  }

fetchCustomer(agentId:any){
  this.registerService.fetchCustomer(agentId).subscribe(
    (data:any)=>{
  this.allCustomer = data['data']
    }
  )
}

}
