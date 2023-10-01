import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoriesBarComponent } from './product-categories-bar.component';

describe('ProductCategoriesBarComponent', () => {
  let component: ProductCategoriesBarComponent;
  let fixture: ComponentFixture<ProductCategoriesBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCategoriesBarComponent]
    });
    fixture = TestBed.createComponent(ProductCategoriesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
