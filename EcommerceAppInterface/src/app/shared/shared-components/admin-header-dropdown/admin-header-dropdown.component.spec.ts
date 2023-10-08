import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderDropdownComponent } from './admin-header-dropdown.component';

describe('AdminHeaderDropdownComponent', () => {
  let component: AdminHeaderDropdownComponent;
  let fixture: ComponentFixture<AdminHeaderDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHeaderDropdownComponent]
    });
    fixture = TestBed.createComponent(AdminHeaderDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
