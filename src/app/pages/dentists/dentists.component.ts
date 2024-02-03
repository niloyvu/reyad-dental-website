import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dentists',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dentists.component.html',
  styleUrl: './dentists.component.scss'
})
export class DentistsComponent implements OnInit {

  dentists: any[] = [];
  counters: any[] = [];
  dentistWorkingProcess: any;

  dentistPageHeaderData: any;

  dataService = inject(DataService);
  imageUrl = environment.IMAGE_URL;

  ngOnInit() {
    this.getCounters();
    this.getActiveDentists();
    this.getDentistsPageHeaderData();
    this.getDentistWorkingProcesses();
  }

  getActiveDentists() {
    this.dataService.getData('active-dentists')
      .subscribe({
        next: ({ data }) => {
          this.dentists = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getDentistsPageHeaderData() {
    this.dataService.getDataByQueryParams('dentist-page-header','?page_type=1')
      .subscribe({
        next: ({ data }) => {
          this.dentistPageHeaderData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getCounters() {
    this.dataService.getData('counters')
      .subscribe({
        next: ({ data }) => {
          this.counters = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getDentistWorkingProcesses() {
    this.dataService.getData('dentist-working-processes')
      .subscribe({
        next: ({ data }) => {
          this.dentistWorkingProcess = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

}
