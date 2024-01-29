import { FormsModule } from '@angular/forms';
import { SwiperOptions } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';
import { DataService } from '../../services/data.service';
import { SharedModule } from './../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment';
import {
  OnInit,
  inject,
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, MatButtonModule, MatDialogModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {

  index = 0;
  formData: any = {};
  featureBlogs: any;
  featureServices: any;
  heroSectionData: any;
  featureDentists: any;
  teamSectionData: any;
  blogSectionData: any;
  heroFormTextData: any;
  serviceSectionData: any;

  homeFeatures: any[] = []
  isFutureDate: boolean = false;
  imageUrl = environment.IMAGE_URL;

  dataService = inject(DataService);

  @ViewChild('teamSwiper') teamSwiper!: ElementRef<SwiperContainer>;
  @ViewChild('serviceSwiper') serviceSwiper!: ElementRef<SwiperContainer>;

  constructor(public dialog: MatDialog) { }
  ngOnInit() {
    this.getHomePageContents();
  }

  serviceSwiperConfig: SwiperOptions = {
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
  teamSwiperConfig: SwiperOptions = {
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

  slideChange(swiper: any) {
    this.index = swiper?.detail[0]?.activeIndex;
  }

  getHomePageContents() {
    this.dataService.getData('home-page-contents')
      .subscribe({
        next: ({ data }) => {
          this.featureBlogs = data.featureBlogs;
          this.heroSectionData = data.heroSection;
          this.teamSectionData = data.teamSection;
          this.blogSectionData = data.blogSection;
          this.featureServices = data.featureServices;
          this.featureDentists = data.featureDentists;
          this.heroFormTextData = data.heroFormSection;
          this.serviceSectionData = data.serviceSection;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  onCheckBookingDate(date: string) {
    const selectedDate = new Date(date);
    const currentDate = new Date();
    this.isFutureDate = selectedDate > currentDate;
  }

  submitForm() {
    console.log(this.formData);
  }

  ngAfterViewInit() {
    if (this.teamSwiper.nativeElement.swiper && this.serviceSwiper.nativeElement.swiper) {
      this.teamSwiper.nativeElement.swiper.activeIndex = this.index;
    }
  }

}


