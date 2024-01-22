import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SharedModule } from './../../shared/shared.module';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  featureBlogs: any;
  heroSectionData: any;
  teamSectionData: any;
  blogSectionData: any;
  heroFormTextData: any;
  serviceSectionData: any;

  homeFeatures: any[] = []
  imageUrl = environment.IMAGE_URL;

  dataService = inject(DataService);

  ngOnInit() {
    this.getFeatureBlogs();
    this.getHeroFormData();
    this.getFeaturesData();
    this.getBlogSectionData();
    this.getHeroSectionData();
    this.getTeamSectionData();
    this.getServiceSectionData();
  }

  getHeroSectionData() {
    this.dataService.getData('hero-section')
      .subscribe({
        next: ({ data }) => {
          this.heroSectionData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getHeroFormData() {
    this.dataService.getData('hero-form-text')
      .subscribe({
        next: ({ data }) => {
          this.heroFormTextData = data;
        },
        error: error => {
          console.error(error);
        }
      })

  }

  getFeaturesData() {
    this.dataService.getData('feature-cards')
      .subscribe({
        next: ({ data }) => {
          this.homeFeatures = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getServiceSectionData() {
    this.dataService.getData('service-section')
      .subscribe({
        next: ({ data }) => {
          this.serviceSectionData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
  getTeamSectionData() {
    this.dataService.getData('team-section')
      .subscribe({
        next: ({ data }) => {
          this.teamSectionData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
  getBlogSectionData() {
    this.dataService.getData('blog-section')
      .subscribe({
        next: ({ data }) => {
          this.blogSectionData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getFeatureBlogs() {
    this.dataService.getData('feature-blogs')
      .subscribe({
        next: ({ data }) => {
          this.featureBlogs = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
