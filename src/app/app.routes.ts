import { Routes } from '@angular/router';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { ProductSearchComponent } from './components/pages/product-search/product-search.component';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { CartDetailsComponent } from './components/pages/cart-details/cart-details.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AccountDashboardComponent } from './components/pages/account-dashboard/account-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { RegistrationPageComponent } from './components/pages/registration-page/registration-page.component';
import { guestGuard } from './guards/guest.guard';
import { OrderPageComponent } from './components/pages/order-page/order-page.component';

export const routes: Routes = [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'product-search',
        component: ProductSearchComponent
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent
    },
    {
        path: 'cart',
        component: CartDetailsComponent
    },
    {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [guestGuard],
        data: {
            layout: 'empty'
        }
    },
    {
        path: 'register',
        component: RegistrationPageComponent,
        canActivate: [guestGuard],
        data: {
            layout: 'empty'
        }
    },
    {
        path: 'user',
        canActivateChild: [authGuard],
        children: [
            {
                path: 'dashboard',
                component: AccountDashboardComponent
            }
        ]
    },
    {
        path: 'order',
        canActivate: [authGuard],
        component: OrderPageComponent
    }
];
