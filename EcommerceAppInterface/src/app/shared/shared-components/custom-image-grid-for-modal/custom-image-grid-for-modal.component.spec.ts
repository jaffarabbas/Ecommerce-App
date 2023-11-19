import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomImageGridForModalComponent } from './custom-image-grid-for-modal.component';

describe('CustomImageGridForModalComponent', () => {
  let component: CustomImageGridForModalComponent;
  let fixture: ComponentFixture<CustomImageGridForModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomImageGridForModalComponent]
    });
    fixture = TestBed.createComponent(CustomImageGridForModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
