import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterSidebarComponent } from '../../../product/search/filter-sidebar/filter-sidebar.component';
import { FormGroup } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { PageEvent } from '@angular/material/paginator';
import { ProductResults } from '../../../../generated';
import { ProductCardComponent } from '../../../../product/product-card/product-card.component';

@Component({
  selector: 'app-product-search',
  imports: [
    CommonModule,
    FilterSidebarComponent,
    MatPaginatorModule,
    ProductCardComponent,
  ],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css',
})
export class ProductSearchComponent {
  form?: FormGroup;
  results?: ProductResults;

  // TODO: Resolve dynamically
  pageSizeOptions = [12, 24, 48];
  pageSize = this.pageSizeOptions[0];
  page = 0;

  constructor(private productService: ProductService) {}

  handleFormSubmission(form: FormGroup) {
    this.form = form;
    this.page = 0;
    this.loadProducts(this.page, this.pageSize, form);
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.page = pageEvent.pageIndex;
    this.loadProducts(pageEvent.pageIndex, pageEvent.pageSize, this.form!);
  }

  loadProducts(page: number, pageSize: number, formData: FormGroup) {
    let pos = ProductSearchComponent.calcPos(page, pageSize);

    this.productService
      .findBy(pos, pageSize, { ...formData.value })
      .subscribe((results) => (this.results = results));
  }

  private static calcPos(page: number, pageSize: number) {
    return page * pageSize + 1;
  }
}
