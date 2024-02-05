import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss'
})

export class BookAppointmentComponent implements OnInit, OnDestroy {

  bookAppointmentPageContents: any;
  imageUrl = environment.IMAGE_URL;

  private subscription$!: Subscription;
  private dataService = inject(DataService);

  ngOnInit(): void {
    this.getBookAppointmentPageContents();
  }

  getBookAppointmentPageContents() {
    this.subscription$ = this.dataService
      .getData('appointment-page')
      .subscribe({
        next: ({ data }) => {
          this.bookAppointmentPageContents = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
