import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../../services/category.service';
import { DefaultService } from '../../../../generated';

@Component({
  selector: 'app-filter-sidebar',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.css'
})
export class FilterSidebarComponent {

  defaultService = inject(DefaultService);
  categories = this.defaultService.findAllCategories("en-GB");

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
