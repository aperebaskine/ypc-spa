import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterSidebarComponent } from '../../product/search/filter-sidebar/filter-sidebar.component';
import { ProductService } from '../../../services/product.service';
import { PageEvent } from '@angular/material/paginator';
import { ProductResults } from '../../../generated';
import { ActivatedRoute } from '@angular/router';
import { ProductGridComponent } from '../../product/product-grid/product-grid.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-search',
  imports: [
    CommonModule,
    FilterSidebarComponent,
    MatPaginatorModule,
    ProductGridComponent,
  ],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss',
})
export class ProductSearchComponent {
  criteria? = {};
  results?: Observable<ProductResults>;

  // TODO: Resolve dynamically
  pageSizeOptions = [12, 24, 48];
  pageSize = this.pageSizeOptions[0];
  page = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.handleFormSubmission(params);
    });
  }

  handleFormSubmission(criteria: any) {
    this.criteria = criteria;
    this.page = 0;
    this.loadProducts(this.page, this.pageSize);
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.page = pageEvent.pageIndex;
    this.loadProducts(pageEvent.pageIndex, pageEvent.pageSize);
  }

  loadProducts(page: number, pageSize: number) {
    let pos = ProductSearchComponent.calcPos(page, pageSize);

    this.results = this.productService.findBy(pos, pageSize, this.criteria!);
  }

  private static calcPos(page: number, pageSize: number) {
    return page * pageSize + 1;
  }
}
