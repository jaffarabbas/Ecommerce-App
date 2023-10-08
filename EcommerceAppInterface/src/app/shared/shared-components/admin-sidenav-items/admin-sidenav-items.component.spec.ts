import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSidenavItemsComponent } from './admin-sidenav-items.component';

describe('AdminSidenavItemsComponent', () => {
  let component: AdminSidenavItemsComponent;
  let fixture: ComponentFixture<AdminSidenavItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSidenavItemsComponent]
    });
    fixture = TestBed.createComponent(AdminSidenavItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
