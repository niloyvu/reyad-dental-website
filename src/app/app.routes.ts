import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ServiceDetailsComponent } from './pages/services/service-details/service-details.component';
import { DentistsComponent } from './pages/dentists/dentists.component';
import { DentistDetailsComponent } from './pages/dentists/dentist-details/dentist-details.component';

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
        path: 'dentists',
        component: DentistsComponent,
    },
    {
        path: 'dentist/:name/:id',
        component: DentistDetailsComponent,
    },
    {
        path: 'services',
        component: ServicesComponent,
    },
    {
        path: 'service/:name/:id',
        component: ServiceDetailsComponent,
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
