import { Component, TemplateRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout-manager',
  imports: [CommonModule, RouterModule, HeaderComponent, NavbarComponent, FooterComponent],
  templateUrl: './layout-manager.component.html',
  styleUrl: './layout-manager.component.scss'
})
export class LayoutManagerComponent {

  @ViewChild('default', { static: true }) default!: TemplateRef<any>;
  @ViewChild('empty', { static: true }) empty!: TemplateRef<any>;

  selectedTemplate!: TemplateRef<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  selectLayout(layout: string) {
    switch (layout) {
      case 'empty':
        this.selectedTemplate = this.empty;
        break;
      default:
        this.selectedTemplate = this.default;
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.route.firstChild?.data.subscribe((data) => {
        this.selectLayout(data['layout'] || 'default');
      }));
  }

}
