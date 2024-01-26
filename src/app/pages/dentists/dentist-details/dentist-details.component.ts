import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-dentist-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dentist-details.component.html',
  styleUrl: './dentist-details.component.scss'
})
export class DentistDetailsComponent implements OnInit {

  dentist: any;
  counters: any[] = [];

  dentistPageHeaderData: any;

  dataService = inject(DataService);
  activatedRoute = inject(ActivatedRoute);

  imageUrl = environment.IMAGE_URL;

  ngOnInit() {
    this.getDentistsPageHeaderData();
    this.getServiceDetailsById(
      this.activatedRoute.snapshot.params['id']
    );
  }

  getServiceDetailsById(serviceId: string) {
    this.dataService.getDataById('dentist-details', serviceId)
      .subscribe({
        next: ({ data }) => {
          console.log("🚀 ~ DentistDetailsComponent ~ getServiceDetailsById ~ data:", data)
          this.dentist = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getDentistsPageHeaderData() {
    this.dataService.getDataByQueryParams('dentist-page-header','?page_type=2')
      .subscribe({
        next: ({ data }) => {
          this.dentistPageHeaderData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
