import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserMenuComponent } from '../../common/user-menu/user-menu.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SearchBoxComponent } from "../../common/search-box/search-box.component";

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    UserMenuComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    SearchBoxComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
