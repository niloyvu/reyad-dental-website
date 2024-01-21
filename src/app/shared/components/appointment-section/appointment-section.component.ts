import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-appointment-section',
  templateUrl: './appointment-section.component.html',
  styleUrl: './appointment-section.component.scss'
})
export class AppointmentSectionComponent implements OnInit {

  appointmentSectionData: any;
  imageUrl = environment.IMAGE_URL;

  dataService = inject(DataService);

  ngOnInit(): void {
    this.getAppointmentSectionData();
  }

  getAppointmentSectionData() {
    this.dataService.appointmentSection()
      .subscribe({
        next: ({ data }) => {
          this.appointmentSectionData = data;
          console.log("🚀 ~ WhoWeAreComponent ~ getWhoAreData ~ this.appointmentSectionData:", this.appointmentSectionData)
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
