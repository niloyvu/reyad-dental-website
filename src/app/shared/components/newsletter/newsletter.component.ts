import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {

  newsletterSectionData: any;
  counterSectionData: any;
  imageUrl = environment.IMAGE_URL;

  dataService = inject(DataService);

  ngOnInit(): void {
    this.getNewsletterSectionData();
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
