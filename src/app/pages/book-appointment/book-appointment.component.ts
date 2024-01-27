import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss'
})

export class BookAppointmentComponent implements OnInit {

  bookAppointmentPageContents: any;
  imageUrl = environment.IMAGE_URL;

  dataService = inject(DataService);

  ngOnInit(): void {
    this.getBookAppointmentPageContents();
  }

  getBookAppointmentPageContents() {
    this.dataService.getData('appointment-page')
      .subscribe({
        next: ({ data }) => {
          this.bookAppointmentPageContents = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
