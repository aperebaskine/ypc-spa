import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../../services/category.service';
import { CategoryDTO, DefaultService } from '../../../../generated';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter-sidebar',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.css'
})
export class FilterSidebarComponent {

  categories: CategoryDTO[] = [];

  constructor(private categoryService: CategoryService) {
    this.categoryService.findAll("en-GB")
      .subscribe((categories) => this.categories = categories);
  }

  searchForm = new FormGroup({
    name: new FormControl(''),
    categoryId: new FormControl(''),
    launchDateFrom: new FormControl(''),
    launchDateTo: new FormControl(''),
    stockFrom: new FormControl(''),
    priceFrom: new FormControl(''),
    attributes: new FormControl('')
  })

  submitSearchForm() {

  }
}
