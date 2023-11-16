import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomModalForAddingDataComponent } from './custom-modal-for-adding-data.component';

describe('CustomModalForAddingDataComponent', () => {
  let component: CustomModalForAddingDataComponent;
  let fixture: ComponentFixture<CustomModalForAddingDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomModalForAddingDataComponent]
    });
    fixture = TestBed.createComponent(CustomModalForAddingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
