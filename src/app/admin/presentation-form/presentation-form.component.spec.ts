import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationFormComponent } from './presentation-form.component';

describe('PresentationFormComponent', () => {
  let component: PresentationFormComponent;
  let fixture: ComponentFixture<PresentationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
