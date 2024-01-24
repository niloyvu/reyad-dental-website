
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { MatCardModule } from '@angular/material/card';
import { LastWordPipe } from './pipes/last-word.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SwiperDirective } from './directive/swiper.directive';
import { RemoveLastWordPipe } from './pipes/remove-last-word.pipe';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { AppointmentSectionComponent } from './components/appointment-section/appointment-section.component';
import { VideoDialogComponent } from './components/appointment-section/video-dialog/video-dialog.component';

register();

@NgModule({
  declarations: [
    SwiperDirective,
    WhoWeAreComponent,
    WhyChooseUsComponent,
    TestimonialComponent,
    NewsletterComponent,
    AppointmentSectionComponent,
    VideoDialogComponent,
  ],
  imports: [
    DatePipe,
    RouterLink,
    CommonModule,
    LastWordPipe,
    MatCardModule,
    TruncatePipe,
    MatDialogModule,
    MatButtonModule,
    RemoveLastWordPipe,
  ],
  exports: [
    DatePipe,
    RouterLink,
    TruncatePipe,
    LastWordPipe,
    MatCardModule,
    SwiperDirective,
    MatDialogModule,
    WhoWeAreComponent,
    RemoveLastWordPipe,
    WhyChooseUsComponent,
    NewsletterComponent,
    TestimonialComponent,
    AppointmentSectionComponent
  ],

})
export class SharedModule { }
