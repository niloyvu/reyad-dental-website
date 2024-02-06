import { Subject, takeUntil } from 'rxjs';
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

  totalItems: number = 0;
  currentPage: number = 1;
  perPageDoctors: number = 8;

  dentistWorkingProcess: any;

  dentistPageHeaderData: any;
  imageUrl = environment.IMAGE_URL;

  private dataService = inject(DataService);
  private unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.getCounters();
    this.getActiveDentists(this.currentPage);
    this.getDentistsPageHeaderData();
    this.getDentistWorkingProcesses();
  }

  getActiveDentists(pageNumber: number) {
    this.currentPage = pageNumber;
    this.dataService
      .getDataByQueryParams(
        'active-dentists', `?page=${pageNumber}&per_page=${this.perPageDoctors}`
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.dentists = data.data;
          this.totalItems = data.total;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getDentistsPageHeaderData() {
    this.dataService
      .getDataByQueryParams('dentist-page-header', '?page_type=1')
      .pipe(takeUntil(this.unsubscribe$))
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
    this.dataService
      .getData('counters')
      .pipe(takeUntil(this.unsubscribe$))
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
    this.dataService
      .getData('dentist-working-processes')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.dentistWorkingProcess = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
