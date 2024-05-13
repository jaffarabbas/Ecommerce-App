import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomModalForEditDataComponent } from './custom-modal-for-edit-data.component';

describe('CustomModalForEditDataComponent', () => {
  let component: CustomModalForEditDataComponent;
  let fixture: ComponentFixture<CustomModalForEditDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomModalForEditDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomModalForEditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
