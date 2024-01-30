import { SwiperOptions } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';
import { DataService } from '../../services/data.service';
import { SharedModule } from './../../shared/shared.module';
import { environment } from '../../../environments/environment';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  OnInit,
  inject,
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { sliderPreviewConfig } from '../../shared/config/slider-config';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class HomeComponent implements OnInit, AfterViewInit {

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

  toastr = inject(ToastrService);
  dataService = inject(DataService);

  @ViewChild('teamSwiper') teamSwiper!: ElementRef<SwiperContainer>;
  @ViewChild('serviceSwiper') serviceSwiper!: ElementRef<SwiperContainer>;

  ngOnInit() {
    this.initializeForm();
    this.getHomePageContents();
  }

  initializeForm() {
    this.heroForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]+$'),
      ]),
      date: new FormControl('',
        [
          Validators.required,
          this.bookingDateValidator.bind(this)
        ]),
    });
  }

  get name() {
    return this.heroForm.get('name');
  }

  get phone() {
    return this.heroForm.get('phone');
  }

  get date() {
    return this.heroForm.get('date');
  }

  bookingDateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 10);

    if (selectedDate < currentDate) {
      return { 'invalidBookingDate': true };
    }
    if (selectedDate > maxDate) {
      return { 'exceedBookingDate': true };
    }

    return null;
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
    breakpoints: sliderPreviewConfig
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
    breakpoints: sliderPreviewConfig
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

  onSubmitBookingForm() {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    this.isSubmitted = true;
    this.dataService.postData(this.heroForm.value, 'website/book-appointment').subscribe({
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
    if (this.teamSwiper.nativeElement.swiper && this.serviceSwiper.nativeElement.swiper) {
      this.teamSwiper.nativeElement.swiper.activeIndex = this.index;
    }
  }

}

