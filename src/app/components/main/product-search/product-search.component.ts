import { Component } from '@angular/core';
import { FilterSidebarComponent } from "../../product/search/filter-sidebar/filter-sidebar.component";
import { SearchResultsComponent } from "../../product/search/search-results/search-results.component";

@Component({
  selector: 'app-product-search',
  imports: [FilterSidebarComponent, SearchResultsComponent],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css'
})
export class ProductSearchComponent {

}
