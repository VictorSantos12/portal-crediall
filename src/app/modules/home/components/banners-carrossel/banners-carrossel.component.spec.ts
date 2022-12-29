import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersCarrosselComponent } from './banners-carrossel.component';

describe('BannersCarrosselComponent', () => {
  let component: BannersCarrosselComponent;
  let fixture: ComponentFixture<BannersCarrosselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannersCarrosselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersCarrosselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
