import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPaginationBarComponent } from './product-pagination-bar.component';

describe('ProductPaginationBarComponent', () => {
  let component: ProductPaginationBarComponent;
  let fixture: ComponentFixture<ProductPaginationBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPaginationBarComponent]
    });
    fixture = TestBed.createComponent(ProductPaginationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
