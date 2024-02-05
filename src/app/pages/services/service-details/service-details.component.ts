import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';
import { VideoDialogComponent } from '../../../shared/components/video-dialog/video-dialog.component';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss'
})
export class ServiceDetailsComponent implements OnInit, OnDestroy {

  serviceDetails: any;
  dialogOpen: boolean = false;
  serviceDetailsHeader: any;
  imageUrl = environment.IMAGE_URL;

  private dialog = inject(MatDialog);
  private dataService = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.getServiceDetailsById(
      this.activatedRoute.snapshot.params['id']
    );
    this.getServiceDetailsHeaderData();
  }

  getServiceDetailsById(serviceId: string) {
    this.dataService
      .getDataById('service-details', serviceId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.serviceDetails = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getServiceDetailsHeaderData() {
    this.dataService
      .getData('service-details-header')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.serviceDetailsHeader = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  onClickOpenVideoModal() {
    if (!this.dialogOpen) {
      const dialogRef = this.dialog
        .open(VideoDialogComponent, {
          data: this.serviceDetails?.video_link,
          disableClose: true
        });
      dialogRef.afterClosed()
        .subscribe(result => {
          this.dialogOpen = false;
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
