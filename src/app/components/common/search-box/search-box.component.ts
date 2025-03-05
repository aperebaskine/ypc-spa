import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {

  form = new FormGroup({
    name: new FormControl('')
  });

  constructor(private router: Router) {
  }

  onSubmit() {

    let name = this.form.value.name;

    if (name !== null && name !== undefined && name.length > 1) {
      this.router.navigate(
        ['/product-search'],
        {
          queryParams: { name: name }
        }
      );
    }
  }

}
