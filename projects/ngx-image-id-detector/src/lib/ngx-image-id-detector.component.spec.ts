import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxImageIdDetectorComponent } from './ngx-image-id-detector.component';

describe('NgxImageIdDetectorComponent', () => {
  let component: NgxImageIdDetectorComponent;
  let fixture: ComponentFixture<NgxImageIdDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxImageIdDetectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxImageIdDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
