import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoryService } from '../../../../services/category.service';
import { CategoryDTO } from '../../../../generated';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-sidebar',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule
  ],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.css'
})
export class FilterSidebarComponent {

  categories: Observable<CategoryDTO[]>;

  constructor(private categoryService: CategoryService) {
    this.categories = this.categoryService.findAll("en-GB");
  }

  searchForm = new FormGroup({
    name: new FormControl(''),
    categoryId: new FormControl(''),
    launchDateFrom: new FormControl(''),
    launchDateTo: new FormControl(''),
    stockFrom: new FormControl(''),
    stockTo: new FormControl(''),
    priceFrom: new FormControl(''),
    priceTo: new FormControl(''),
    attributes: new FormControl('')
  })

  submitSearchForm() {

  }
}
