import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyWindowComponent } from './buy-window.component';

describe('BuyWindowComponent', () => {
  let component: BuyWindowComponent;
  let fixture: ComponentFixture<BuyWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
