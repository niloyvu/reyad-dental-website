import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LastWordPipe } from './pipes/last-word.pipe';
import { RemoveLastWordPipe } from './pipes/remove-last-word.pipe';
import { WhoWeAreComponent } from './components/who-we-are/who-we-are.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { AppointmentSectionComponent } from './components/appointment-section/appointment-section.component';

@NgModule({
  declarations: [
    WhoWeAreComponent,
    WhyChooseUsComponent,
    AppointmentSectionComponent
  ],
  imports: [
    RouterLink,
    CommonModule,
    LastWordPipe,
    RemoveLastWordPipe,
  ],
  exports: [
    RouterLink,
    LastWordPipe,
    RemoveLastWordPipe,
    WhoWeAreComponent,
    WhyChooseUsComponent,
    AppointmentSectionComponent
  ]
})
export class SharedModule { }
