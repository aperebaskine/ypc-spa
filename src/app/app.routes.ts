import { Routes } from '@angular/router';
import { MainPageComponent } from './components/layout/main/main-page/main-page.component';
import { ProductSearchComponent } from './components/layout/main/product-search/product-search.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'product-search', component: ProductSearchComponent },
];
