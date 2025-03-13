import { Component, OnInit } from '@angular/core';
import { ProductGridComponent } from '../../product/product-grid/product-grid.component';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs';
import { ProductResults } from '../../../generated';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-page',
  imports: [ProductGridComponent, AsyncPipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  newProducts?: Observable<ProductResults>;
  sales?: Observable<ProductResults>;
  cpus?: Observable<ProductResults>;
  gpus?: Observable<ProductResults>;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.newProducts = this.productService.findBy(1, 4, {
      orderBy: ' p.LAUNCH_DATE',
      ascDesc: 'desc',
    });
    this.sales = this.productService.findBy(1, 4, {
      orderBy: ' p.SALE_PRICE',
      ascDesc: 'asc',
    });
    this.cpus = this.productService.findBy(1, 4, {
      categoryId: 1
    });
    this.gpus = this.productService.findBy(1, 4, {
      categoryId: 5
    });
  }
}
