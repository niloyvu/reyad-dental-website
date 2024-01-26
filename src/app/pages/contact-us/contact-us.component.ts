import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  contactUsPageData: any;
  imageUrl = environment.IMAGE_URL;

  dataService = inject(DataService);

  ngOnInit(): void {
    this.getContactUsPageContents();
  }

  getContactUsPageContents() {
    this.dataService.getData('contact-us')
      .subscribe({
        next: ({ data }) => {
          console.log("🚀 ~ ContactUsComponent ~ getContactUsPageContents ~ data:", data)
          this.contactUsPageData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

}
