import { Routes } from '@angular/router';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { ProductSearchComponent } from './components/pages/product-search/product-search.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { CartDetailsComponent } from './components/pages/cart-details/cart-details.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'product-search', component: ProductSearchComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'cart', component: CartDetailsComponent },
    { path: 'login', component: LoginPageComponent, data: { layout: 'empty' } }
];
