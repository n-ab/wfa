import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundeditComponent } from './soundedit.component';

describe('SoundeditComponent', () => {
  let component: SoundeditComponent;
  let fixture: ComponentFixture<SoundeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
