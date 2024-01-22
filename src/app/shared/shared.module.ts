import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LastWordPipe } from './pipes/last-word.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { RemoveLastWordPipe } from './pipes/remove-last-word.pipe';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { AppointmentSectionComponent } from './components/appointment-section/appointment-section.component';

@NgModule({
  declarations: [
    WhoWeAreComponent,
    WhyChooseUsComponent,
    TestimonialComponent,
    NewsletterComponent,
    AppointmentSectionComponent,
  ],
  imports: [
    DatePipe,
    RouterLink,
    CommonModule,
    LastWordPipe,
    TruncatePipe,
    RemoveLastWordPipe,
  ],
  exports: [
    DatePipe,
    RouterLink,
    TruncatePipe,
    LastWordPipe,
    WhoWeAreComponent,
    RemoveLastWordPipe,
    WhyChooseUsComponent,
    NewsletterComponent,
    TestimonialComponent,
    AppointmentSectionComponent
  ]
})
export class SharedModule { }
