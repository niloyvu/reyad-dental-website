import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-testimonial',
  standalone: false,
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent implements OnInit {
  index = 0;
  testimonialSectionData: any;
  featureTestimonials: any;
  imageUrl = environment.IMAGE_URL;

  dataService = inject(DataService);

  @ViewChild('testimonialSwiper') swiperTestimonial!: ElementRef<SwiperContainer>;

  testimonialSwiperConfig: SwiperOptions = {
    spaceBetween: 10,
    grabCursor: true,
    loop: false,
    speed: 1200,
    navigation: {
      nextEl: ".service-card-next",
      prevEl: ".service-card-prev"
    },
    pagination: {
      el: ".testimonial-pagination",
      dynamicBullets: true,
      clickable: true
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
  ngOnInit(): void {
    this.getTestimonialSectionData();
    this.getFeatureTestimonialsSectionData();
  }

  getTestimonialSectionData() {
    this.dataService.getData('testimonial-section')
      .subscribe({
        next: ({ data }) => {
          this.testimonialSectionData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getFeatureTestimonialsSectionData() {
    this.dataService.getData('feature-testimonials')
      .subscribe({
        next: ({ data }) => {

          this.featureTestimonials = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }


  ngAfterViewInit() {
    if (this.swiperTestimonial.nativeElement.swiper) {
      this.swiperTestimonial.nativeElement.swiper.activeIndex = this.index;
    }
  }

  slideChange(swiper: any) {
    this.index = swiper?.detail[0]?.activeIndex;
  }
}
