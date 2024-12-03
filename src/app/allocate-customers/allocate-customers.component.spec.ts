import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateCustomersComponent } from './allocate-customers.component';

describe('AllocateCustomersComponent', () => {
  let component: AllocateCustomersComponent;
  let fixture: ComponentFixture<AllocateCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocateCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocateCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
