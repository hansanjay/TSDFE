import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyPlanComponent } from './journey-plan.component';

describe('JourneyPlanComponent', () => {
  let component: JourneyPlanComponent;
  let fixture: ComponentFixture<JourneyPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JourneyPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JourneyPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
