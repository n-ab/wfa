import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundaddComponent } from './soundadd.component';

describe('SoundaddComponent', () => {
  let component: SoundaddComponent;
  let fixture: ComponentFixture<SoundaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
