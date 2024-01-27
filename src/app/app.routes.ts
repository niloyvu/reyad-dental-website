import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ServiceDetailsComponent } from './pages/services/service-details/service-details.component';
import { DentistsComponent } from './pages/dentists/dentists.component';
import { DentistDetailsComponent } from './pages/dentists/dentist-details/dentist-details.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { BlogDetailsComponent } from './pages/blogs/blog-details/blog-details.component';

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
        path: 'blogs',
        component: BlogsComponent,
    },
    {
        path: 'blog/:name/:id',
        component: BlogDetailsComponent,
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
        path: 'book-appointment',
        component: BookAppointmentComponent,
    },

    {
        path: '**', component: HomeComponent
    },

];
