import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { DataService } from '../../services/data.service';
import { SharedModule } from './../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { AfterViewInit, OnInit, Component, ElementRef, ViewChild, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { VideoDialogComponent } from '../../shared/components/appointment-section/video-dialog/video-dialog.component';

export interface Card {
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, MatButtonModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {

  featureBlogs: any;
  featureServices: any;
  heroSectionData: any;
  teamSectionData: any;
  blogSectionData: any;
  heroFormTextData: any;
  serviceSectionData: any;

  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;

  homeFeatures: any[] = []
  imageUrl = environment.IMAGE_URL;

  constructor(public dialog: MatDialog) {}

  dataService = inject(DataService);

  index = 0;

  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
    grabCursor: true,
    loop: false,
    speed: 1200,
    navigation: {
      nextEl: ".service-card-next",
      prevEl: ".service-card-prev"
    },
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 2
      },
      1200: {
        slidesPerView: 3
      }
    }
  }

  ngAfterViewInit() {
    this.swiper.nativeElement.swiper.activeIndex = this.index;
  }

  slideChange(swiper: any) {
    this.index = swiper?.detail[0]?.activeIndex;
  }

  ngOnInit() {
    this.getHomePageContents();
  }

  getHomePageContents() {
    this.dataService.getData('home-page-contents')
      .subscribe({
        next: ({ data }) => {
          console.log("🚀 ~ HomeComponent ~ getHomePageContents ~ data:", data)
          this.featureBlogs = data.featureBlogs;
          this.heroSectionData = data.heroSection;
          this.teamSectionData = data.teamSection;
          this.blogSectionData = data.blogSection;
          this.featureServices = data.featureServices;
          this.heroFormTextData = data.heroFormSection;
          this.serviceSectionData = data.serviceSection;
        },
        error: error => {
          console.error(error);
        }
      })
  }

}


