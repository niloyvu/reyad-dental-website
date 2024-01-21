import { SharedModule } from './../../shared/shared.module';
import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  imageUrl = environment.IMAGE_URL;
  heroSectionData: any;
  serviceSectionData: any;
  heroFormTextData: any;
  homeFeatures: any[] = []

  dataService = inject(DataService);

  ngOnInit() {
    this.getHeroSectionData();
    this.getHeroFormData();
    this.getFeaturesData();
    this.getServiceSectionData();
  }

  getHeroSectionData() {
    this.dataService.heroSection()
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
    this.dataService.heroFormText()
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
    this.dataService.homeFeatures()
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
    this.dataService.dentalServices()
      .subscribe({
        next: ({ data }) => {
          this.serviceSectionData = data;
          console.log("🚀 ~ HomeComponent ~ getFeaturesData ~ this.homeFeatures:", this.serviceSectionData)
        },
        error: error => {
          console.error(error);
        }
      })
  }

}
