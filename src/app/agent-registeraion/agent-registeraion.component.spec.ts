import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRegisteraionComponent } from './agent-registeraion.component';

describe('AgentRegisteraionComponent', () => {
  let component: AgentRegisteraionComponent;
  let fixture: ComponentFixture<AgentRegisteraionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentRegisteraionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentRegisteraionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
