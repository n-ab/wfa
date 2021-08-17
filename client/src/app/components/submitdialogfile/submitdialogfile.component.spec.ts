import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitdialogfileComponent } from './submitdialogfile.component';

describe('SubmitdialogfileComponent', () => {
  let component: SubmitdialogfileComponent;
  let fixture: ComponentFixture<SubmitdialogfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitdialogfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitdialogfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
