import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-dentist-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dentist-details.component.html',
  styleUrl: './dentist-details.component.scss'
})
export class DentistDetailsComponent implements OnInit, OnDestroy {

  dentist: any;
  counters: any[] = [];

  dentistPageHeaderData: any;
  imageUrl = environment.IMAGE_URL;

  private unsubscribe$ = new Subject<void>();

  private dataService = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.getDentistsPageHeaderData();
    this.getServiceDetailsById(
      this.activatedRoute.snapshot.params['id']
    );
  }

  getServiceDetailsById(serviceId: string) {
    this.dataService
      .getDataById('dentist-details', serviceId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.dentist = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getDentistsPageHeaderData() {
    this.dataService
      .getDataByQueryParams('dentist-page-header', '?page_type=2')
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
