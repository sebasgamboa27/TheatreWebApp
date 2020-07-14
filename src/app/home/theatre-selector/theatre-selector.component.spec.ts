import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatreSelectorComponent } from './theatre-selector.component';

describe('TheatreSelectorComponent', () => {
  let component: TheatreSelectorComponent;
  let fixture: ComponentFixture<TheatreSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheatreSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheatreSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
