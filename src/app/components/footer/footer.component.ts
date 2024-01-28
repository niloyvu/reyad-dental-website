import { Component, HostListener, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  newsletterSectionData: any;
  dataService = inject(DataService);
  imageUrl = environment.IMAGE_URL;
  footerData: any = [];

  buttonOpacity: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition > 200) {
      this.buttonOpacity = 1;
    } else {
      this.buttonOpacity = 0;
    }
  }

  ngOnInit() {
    this.getFooterSectionData();
    this.getNewsletterSectionData();
  }

  getFooterSectionData() {
    this.dataService.getData('footer-section')
      .subscribe({
        next: ({ data }) => {
          this.footerData = data;
        },
        error: error => {
          console.error(error)
        }
      })
  }

  getNewsletterSectionData() {
    this.dataService.getData('newsletter-section')
      .subscribe({
        next: ({ data }) => {
          this.newsletterSectionData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  scrollToTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}
