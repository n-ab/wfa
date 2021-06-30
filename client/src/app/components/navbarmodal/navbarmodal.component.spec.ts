import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarmodalComponent } from './navbarmodal.component';

describe('NavbarmodalComponent', () => {
  let component: NavbarmodalComponent;
  let fixture: ComponentFixture<NavbarmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
