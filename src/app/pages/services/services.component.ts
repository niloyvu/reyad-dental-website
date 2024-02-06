import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit, OnDestroy {

  services: any[] = [];
  serviceHeaderData: any;
  
  perPageServices: number = 6;
  currentPage: number = 1;
  totalItems: number = 0;

  imageUrl = environment.IMAGE_URL;

  private dataService = inject(DataService);
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.activeServices(this.currentPage);
    this.getServiceHeaderData();
  }

  activeServices(pageNumber: number) {
    this.currentPage = pageNumber;
    this.dataService
      .getDataByQueryParams(
        'active-services', `?page=${pageNumber}&per_page=${this.perPageServices}`
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.services = data.data;
          this.totalItems = data.total;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getServiceHeaderData() {
    this.dataService
      .getData('service-header')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.serviceHeaderData = data;
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
