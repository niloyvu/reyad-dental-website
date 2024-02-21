import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SwiperOptions } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';
import { DataService } from '../../services/data.service';
import { SharedModule } from './../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { sliderPreviewConfig } from '../../shared/config/slider-config';
import { bookingDateValidator } from '../../shared/validators/booking-date';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OnInit, inject, Component, ElementRef, ViewChild, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, MatProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  index = 0;
  heroForm!: FormGroup;
  isSubmitted = false;
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

  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  private dataService = inject(DataService);

  private unsubscribe$ = new Subject<void>();

  @ViewChild('teamSwiper') teamSwiper!: ElementRef<SwiperContainer>;
  @ViewChild('serviceSwiper') serviceSwiper!: ElementRef<SwiperContainer>;

  ngOnInit() {
    this.initializeForm();
    this.getHomePageContents();
  }

  initializeForm() {
    this.heroForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      phone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
      date: [null, [Validators.required, bookingDateValidator.bind(this)]],
    });
  }

  serviceSwiperConfig: SwiperOptions = {
    spaceBetween: 10,
    grabCursor: true,
    loop: false,
    speed: 1200,
    breakpoints: sliderPreviewConfig
  }

  teamSwiperConfig: SwiperOptions = {
    spaceBetween: 10,
    grabCursor: true,
    loop: false,
    speed: 1200,
    breakpoints: sliderPreviewConfig
  }

  slideChange(swiper: any) {
    this.index = swiper?.detail[0]?.activeIndex;
  }

  getHomePageContents() {
    this.dataService
      .getData('home-page-contents')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.featureBlogs = data.featureBlogs.slice(0,3);
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

  onSubmitBookingForm() {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    this.isSubmitted = true;
    this.dataService
      .postData(this.heroForm.value, 'website/web-book-appointment')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          this.isSubmitted = false;
          if (response.code == 200) {
            this.heroForm.reset();
            this.toastr.success(response.message);
          }
          else {
            this.toastr.error('Form Submission Failed!');
          }
        },
        error: error => {
          console.error(error);
          this.isSubmitted = false;
          this.toastr.error('Form Submission Failed!');
        }
      });
  }

  ngAfterViewInit() {
    if (this.teamSwiper?.nativeElement?.swiper && this.serviceSwiper?.nativeElement?.swiper) {
      this.teamSwiper.nativeElement.swiper.activeIndex = this.index;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

