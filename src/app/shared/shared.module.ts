
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LastWordPipe } from './pipes/last-word.pipe';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SwiperDirective } from './directive/swiper.directive';
import { SlugGeneratorPipe } from './pipes/slug-generator.pipe';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemoveLastWordPipe } from './pipes/remove-last-word.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { VideoDialogComponent } from './components/video-dialog/video-dialog.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { AppointmentSectionComponent } from './components/appointment-section/appointment-section.component';

register();

@NgModule({
  declarations: [
    SwiperDirective,
    WhoWeAreComponent,
    WhyChooseUsComponent,
    TestimonialComponent,
    VideoDialogComponent,
    AppointmentSectionComponent,
  ],
  imports: [
    DatePipe,
    RouterLink,
    FormsModule,
    CommonModule,
    LastWordPipe,
    TruncatePipe,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonModule,
    SlugGeneratorPipe,
    RemoveLastWordPipe,
    MatProgressSpinner,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  exports: [
    DatePipe,
    RouterLink,
    FormsModule,
    TruncatePipe,
    LastWordPipe,
    CommonModule,
    MatCardModule,
    SwiperDirective,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    WhoWeAreComponent,
    SlugGeneratorPipe,
    RemoveLastWordPipe,
    MatProgressSpinner,
    ReactiveFormsModule,
    MatProgressBarModule,
    WhyChooseUsComponent,
    TestimonialComponent,
    AppointmentSectionComponent
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }
