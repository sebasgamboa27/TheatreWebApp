import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterAdminLoginComponent } from './theater-admin-login.component';

describe('TheaterAdminLoginComponent', () => {
  let component: TheaterAdminLoginComponent;
  let fixture: ComponentFixture<TheaterAdminLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheaterAdminLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheaterAdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
