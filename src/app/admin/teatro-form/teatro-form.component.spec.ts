import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeatroFormComponent } from './teatro-form.component';

describe('TeatroFormComponent', () => {
  let component: TeatroFormComponent;
  let fixture: ComponentFixture<TeatroFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeatroFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeatroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
