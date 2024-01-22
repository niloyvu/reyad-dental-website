import { Component, inject } from '@angular/core';
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
}
