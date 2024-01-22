import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-appointment-section',
  templateUrl: './appointment-section.component.html',
  styleUrl: './appointment-section.component.scss'
})
export class AppointmentSectionComponent implements OnInit {

  appointmentSectionData: any;
  counterSectionData: any;
  imageUrl = environment.IMAGE_URL;

  dataService = inject(DataService);

  ngOnInit(): void {
    this.getCounterSection();
    this.getAppointmentSectionData();
  }

  getAppointmentSectionData() {
    this.dataService.getData('appointment-section')
      .subscribe({
        next: ({ data }) => {
          this.appointmentSectionData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
  getCounterSection() {
    this.dataService.getData('counter-section')
      .subscribe({
        next: ({ data }) => {
          this.counterSectionData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
