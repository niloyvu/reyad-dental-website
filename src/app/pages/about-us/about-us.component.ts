import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  aboutUsPageData: any;
  serviceSectionText: any;
  teamSectionText: any;
  featureServices: any[] = [];
  featureDentists: any[] = [];

  imageUrl = environment.IMAGE_URL;
  dataService = inject(DataService);

  ngOnInit(): void {
    this.getFeatureServices();
    this.getFeatureDentists();
    this.getTeamSectionText();
    this.getServiceSectionText();
    this.getAboutUsPageContents();
  }

  getAboutUsPageContents() {
    this.dataService.getData('about-us')
      .subscribe({
        next: ({ data }) => {
          this.aboutUsPageData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getFeatureServices() {
    this.dataService.getData('feature-services')
      .subscribe({
        next: ({ data }) => {
          this.featureServices = data.slice(0, 4);
        },
        error: error => {
          console.error(error);
        },
      });
  }

  getServiceSectionText() {
    this.dataService.getData('service-section')
      .subscribe({
        next: ({ data }) => {
          this.serviceSectionText = data;
        },
        error: error => {
          console.error(error);
        },
      });
  }

  getTeamSectionText() {
    this.dataService.getData('team-section')
      .subscribe({
        next: ({ data }) => {
          this.teamSectionText = data;
        },
        error: error => {
          console.error(error);
        },
      });
  }

  getFeatureDentists() {
    this.dataService.getData('feature-dentists')
      .subscribe({
        next: ({ data }) => {
          this.featureDentists = data.slice(0, 4);
        },
        error: error => {
          console.error(error);
        },
      });
  }

}
