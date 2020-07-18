import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeatroEmployeeFormComponent } from './teatro-employee-form.component';

describe('TeatroEmployeeFormComponent', () => {
  let component: TeatroEmployeeFormComponent;
  let fixture: ComponentFixture<TeatroEmployeeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeatroEmployeeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeatroEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
