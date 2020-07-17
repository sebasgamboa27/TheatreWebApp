import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionOptionsComponent } from './production-options.component';

describe('ProductionOptionsComponent', () => {
  let component: ProductionOptionsComponent;
  let fixture: ComponentFixture<ProductionOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
