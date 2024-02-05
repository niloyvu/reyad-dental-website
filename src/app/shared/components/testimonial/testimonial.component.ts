import { Subject, takeUntil } from 'rxjs';
import { SwiperOptions } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';
import { DataService } from '../../../services/data.service';
import { sliderPreviewConfig } from '../../config/slider-config';
import { environment } from '../../../../environments/environment';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  standalone: false,
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent implements OnInit, OnDestroy {
  
  index = 0;
  featureTestimonials: any;
  testimonialSectionData: any;

  imageUrl = environment.IMAGE_URL;
  private dataService = inject(DataService);
  private unsubscribe$ = new Subject<void>();

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
    breakpoints: sliderPreviewConfig
  }

  ngOnInit(): void {
    this.getTestimonialSectionData();
    this.getFeatureTestimonialsSectionData();
  }

  getTestimonialSectionData() {
    this.dataService
      .getData('testimonial-section')
      .pipe(takeUntil(this.unsubscribe$))
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
    this.dataService
      .getData('feature-testimonials')
      .pipe(takeUntil(this.unsubscribe$))
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
