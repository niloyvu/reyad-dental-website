import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { DataService } from '../../services/data.service';
import { SharedModule } from './../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { AfterViewInit, OnInit, Component, ElementRef, ViewChild, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperDirective } from '../../shared/directive/swiper.directive';

export interface Card {
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, SwiperDirective],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {

  featureBlogs: any;
  heroSectionData: any;
  teamSectionData: any;
  blogSectionData: any;
  heroFormTextData: any;
  serviceSectionData: any;

  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;
  @ViewChild('swiperThumbs') swiperThumbs!: ElementRef<SwiperContainer>;

  homeFeatures: any[] = []
  imageUrl = environment.IMAGE_URL;

  dataService = inject(DataService);

  contents: Card[] = [
    {
      title: 'Computer',
      description: 'Description about computer...',
      url: 'https://picsum.photos/id/1/640/480',
    },
    {
      title: 'Building',
      description: 'Building description...',
      url: 'https://picsum.photos/id/101/640/480',
    }, {
      title: 'Glass over a computer',
      description: 'Description of a glass over a computer',
      url: 'https://picsum.photos/id/201/640/480',
    }, {
      title: 'Autumn',
      description: 'Description about autumn leaves',
      url: 'https://picsum.photos/id/301/640/480',
    }, {
      title: 'Balloon',
      description: 'Coloured balloon',
      url: 'https://picsum.photos/id/401/640/480',
    },
  ];

  index = 0;

  // Swiper
  swiperConfig: SwiperOptions = {
    spaceBetween: 10,
    grabCursor: true,
    loop: false,
    // autoHeight: true,
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

  swiperThumbsConfig: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  }

  ngAfterViewInit() {
    this.swiper.nativeElement.swiper.activeIndex = this.index;
    this.swiperThumbs.nativeElement.swiper.activeIndex = this.index;
  }

  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex;
  }

  ngOnInit() {
    this.getHomePageContents();
  }

  getHomePageContents() {
    this.dataService.getData('home-page-contents')
      .subscribe({
        next: ({ data }) => {
          this.featureBlogs = data.featureBlogs;
          this.heroSectionData = data.heroSection;
          this.teamSectionData = data.teamSection;
          this.blogSectionData = data.blogSection;
          this.heroFormTextData = data.heroFormSection;
          this.serviceSectionData = data.serviceSection;
        },
        error: error => {
          console.error(error);
        }
      })
  }

}


