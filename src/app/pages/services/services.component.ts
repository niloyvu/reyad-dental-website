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
  imageUrl = environment.IMAGE_URL;

  private dataService = inject(DataService);
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.getServices();
    this.getServiceHeaderData();
  }

  getServices() {
    this.dataService
      .getData('active-services')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.services = data;
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
