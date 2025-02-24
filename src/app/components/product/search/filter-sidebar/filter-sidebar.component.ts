import { Attribute, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryService } from '../../../../services/category.service';
import { CategoryDTO } from '../../../../generated';
import { Observable } from 'rxjs';
import { AttributeService } from '../../../../services/attribute.service';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-filter-sidebar',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDividerModule,
  ],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.css',
})
export class FilterSidebarComponent {
  categories: Observable<CategoryDTO[]>;
  attributes?: Observable<Attribute[]>;

  searchForm = new FormGroup({
    name: new FormControl(),
    categoryId: new FormControl(),
    launchDateFrom: new FormControl(),
    launchDateTo: new FormControl(),
    hasStock: new FormControl(),
    priceMin: new FormControl(),
    priceMax: new FormControl(),
    attributes: new FormControl(),
  });

  @Output() form = new EventEmitter<FormGroup>();

  constructor(
    private attributeService: AttributeService,
    private categoryService: CategoryService
  ) {
    this.categories = this.categoryService.findAll('en-GB');

    this.searchForm
      .get('categoryId')
      ?.valueChanges.subscribe((categoryId) =>
        this.displayAttributeFilters(categoryId)
      );
  }

  displayAttributeFilters(categoryId?: number | null) {
    if (categoryId) {
      this.attributeService
        .findByCategory(categoryId, 'en-GB')
        .subscribe((attributes) => console.log(attributes));
    }
  }

  onSubmit() {
    this.form.emit(this.searchForm);
  }
}
