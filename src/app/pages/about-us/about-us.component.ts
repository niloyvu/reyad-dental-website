import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})

export class AboutUsComponent implements OnInit, OnDestroy {

  aboutUsPageData: any;
  serviceSectionText: any;
  teamSectionText: any;
  featureServices: any[] = [];
  featureDentists: any[] = [];

  imageUrl = environment.IMAGE_URL;

  private dataService = inject(DataService);
  private unsubscribe$ = new Subject<void>()

  ngOnInit(): void {
    this.getFeatureServices();
    this.getFeatureDentists();
    this.getTeamSectionText();
    this.getServiceSectionText();
    this.getAboutUsPageContents();
  }

  getAboutUsPageContents() {
    this.dataService
      .getData('about-us')
      .pipe(takeUntil(this.unsubscribe$))
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
    this.dataService
      .getData('feature-services')
      .pipe((takeUntil(this.unsubscribe$)))
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
    this.dataService
      .getData('service-section')
      .pipe((takeUntil(this.unsubscribe$)))
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
    this.dataService
      .getData('team-section')
      .pipe((takeUntil(this.unsubscribe$)))
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
    this.dataService
      .getData('feature-dentists')
      .pipe((takeUntil(this.unsubscribe$)))
      .subscribe({
        next: ({ data }) => {
          this.featureDentists = data.slice(0, 4);
        },
        error: error => {
          console.error(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
