import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../../services/category.service';
import { Attribute, CategoryDTO } from '../../../../generated';
import { Observable } from 'rxjs';
import { AttributeService } from '../../../../services/attribute.service';
import { AttributeSearchFilterComponent } from '../../../attribute/attribute-search-filter/attribute-search-filter.component';

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
    MatButtonModule,
    AttributeSearchFilterComponent,
  ],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss',
})
export class FilterSidebarComponent {
  categories?: Observable<CategoryDTO[]>;
  attributes?: Observable<Attribute[]>;

  searchForm = new FormGroup({
    name: new FormControl(),
    categoryId: new FormControl(),
    launchDateFrom: new FormControl(),
    launchDateTo: new FormControl(),
    hasStock: new FormControl(),
    priceMin: new FormControl(),
    priceMax: new FormControl(),
    attributes: new FormGroup({}),
  });

  @Output() form = new EventEmitter<any>();

  constructor(
    private attributeService: AttributeService,
    private categoryService: CategoryService
  ) {
    this.categories = this.categoryService.findAll();

    this.searchForm.get('categoryId')?.valueChanges.subscribe((categoryId) => {
      // TODO: Clean up code
      let attributeGroup = this.searchForm.get('attributes') as FormGroup;
      for (let i in attributeGroup.controls) {
        attributeGroup.removeControl(i);
      }
      if (categoryId > 0) {
        this.loadAttributeFilters(categoryId);
      } else {
        this.attributes = undefined;
      }
    });
  }

  loadAttributeFilters(categoryId: number) {
    this.attributes = this.attributeService.findByCategory(categoryId);
  }

  attributeCriteriaChanged(attribute: any) {
    let attributeGroup = this.searchForm.get('attributes') as FormGroup;
    attributeGroup.removeControl(attribute.id.toString());

    if (attribute.values.length > 0) {
      attributeGroup.addControl(
        attribute.id.toString(),
        new FormControl(attribute)
      );
    }
  }

  onSubmit() {
    let res = { ...this.searchForm.value };
    res.attributes = Object.values(res.attributes!);
    this.form.emit(res);
  }
}
