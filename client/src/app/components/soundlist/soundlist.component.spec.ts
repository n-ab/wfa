import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundlistComponent } from './soundlist.component';

describe('SoundlistComponent', () => {
  let component: SoundlistComponent;
  let fixture: ComponentFixture<SoundlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
