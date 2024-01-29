
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { MatCardModule } from '@angular/material/card';
import { LastWordPipe } from './pipes/last-word.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SwiperDirective } from './directive/swiper.directive';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SlugGeneratorPipe } from './pipes/slug-generator.pipe';
import { RemoveLastWordPipe } from './pipes/remove-last-word.pipe';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { AppointmentSectionComponent } from './components/appointment-section/appointment-section.component';
import { VideoDialogComponent } from './components/video-dialog/video-dialog.component';

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
    MatDialogModule,
    MatButtonModule,
    SlugGeneratorPipe,
    RemoveLastWordPipe,
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
    MatDialogModule,
    WhoWeAreComponent,
    SlugGeneratorPipe,
    RemoveLastWordPipe,
    WhyChooseUsComponent,
    TestimonialComponent,
    AppointmentSectionComponent
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule { }
