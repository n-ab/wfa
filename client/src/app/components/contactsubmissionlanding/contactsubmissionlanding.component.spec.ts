import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsubmissionlandingComponent } from './contactsubmissionlanding.component';

describe('ContactsubmissionlandingComponent', () => {
  let component: ContactsubmissionlandingComponent;
  let fixture: ComponentFixture<ContactsubmissionlandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsubmissionlandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsubmissionlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
