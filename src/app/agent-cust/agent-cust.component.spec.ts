import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCustComponent } from './agent-cust.component';

describe('AgentCustComponent', () => {
  let component: AgentCustComponent;
  let fixture: ComponentFixture<AgentCustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentCustComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
