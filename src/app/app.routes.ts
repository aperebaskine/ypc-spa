import { Routes } from '@angular/router';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { ProductSearchComponent } from './components/pages/product-search/product-search.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'product-search', component: ProductSearchComponent },
    { path: 'product/:id', component: ProductDetailsComponent }
];
