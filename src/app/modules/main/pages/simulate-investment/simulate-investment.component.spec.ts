import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulateInvestmentComponent } from './simulate-investment.component';

describe('SimulateInvestmentComponent', () => {
  let component: SimulateInvestmentComponent;
  let fixture: ComponentFixture<SimulateInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulateInvestmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulateInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
