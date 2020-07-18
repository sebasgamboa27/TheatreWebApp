import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysAdimLoginComponent } from './sys-adim-login.component';

describe('SysAdimLoginComponent', () => {
  let component: SysAdimLoginComponent;
  let fixture: ComponentFixture<SysAdimLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysAdimLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysAdimLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
