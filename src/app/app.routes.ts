import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },

    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'about-us',
        component: AboutUsComponent,
    },
    {
        path: 'services',
        component: ServicesComponent,
    },
    {
        path: 'blog',
        component: BlogComponent,
    },
    {
        path: 'shop',
        component: ShopComponent,
    },
    {
        path: 'contact-us',
        component: ContactUsComponent,
    },

    {
        path: '**', component: HomeComponent
    },

];
