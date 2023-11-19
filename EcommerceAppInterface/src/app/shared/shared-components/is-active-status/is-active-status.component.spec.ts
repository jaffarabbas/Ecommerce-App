import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsActiveStatusComponent } from './is-active-status.component';

describe('IsActiveStatusComponent', () => {
  let component: IsActiveStatusComponent;
  let fixture: ComponentFixture<IsActiveStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsActiveStatusComponent]
    });
    fixture = TestBed.createComponent(IsActiveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
