import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPasswordFromEmailComponent } from './enter-password-from-email.component';

describe('EnterPasswordFromEmailComponent', () => {
  let component: EnterPasswordFromEmailComponent;
  let fixture: ComponentFixture<EnterPasswordFromEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterPasswordFromEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPasswordFromEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
