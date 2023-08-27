import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSubmitComponent } from './custom-submit.component';

describe('CustomSubmitComponent', () => {
  let component: CustomSubmitComponent;
  let fixture: ComponentFixture<CustomSubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomSubmitComponent]
    });
    fixture = TestBed.createComponent(CustomSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
