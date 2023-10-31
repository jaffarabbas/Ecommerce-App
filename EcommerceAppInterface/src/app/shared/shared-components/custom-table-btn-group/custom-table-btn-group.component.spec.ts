import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableBtnGroupComponent } from './custom-table-btn-group.component';

describe('CustomTableBtnGroupComponent', () => {
  let component: CustomTableBtnGroupComponent;
  let fixture: ComponentFixture<CustomTableBtnGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTableBtnGroupComponent]
    });
    fixture = TestBed.createComponent(CustomTableBtnGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
