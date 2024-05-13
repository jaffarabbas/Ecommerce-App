import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomModalForDetailDataComponent } from './custom-modal-for-detail-data.component';

describe('CustomModalForDetailDataComponent', () => {
  let component: CustomModalForDetailDataComponent;
  let fixture: ComponentFixture<CustomModalForDetailDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomModalForDetailDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomModalForDetailDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
