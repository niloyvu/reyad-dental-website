import { filter } from 'rxjs';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ShopComponent } from './pages/shop/shop.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { HomeComponent } from './pages/home/home.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ShopComponent,
    BlogsComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    HttpClientModule,
    AboutUsComponent,
    ServicesComponent,
    ContactUsComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  buttonOpacity: number = 0;
  router = inject(Router)

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition > 200) {
      this.buttonOpacity = 1;
    } else {
      this.buttonOpacity = 0;
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.scrollToTop();
      });
  }

  scrollToTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleTheme() {
    
  }
}
