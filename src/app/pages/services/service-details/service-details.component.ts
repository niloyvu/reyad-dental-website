import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { VideoDialogComponent } from '../../../shared/components/video-dialog/video-dialog.component';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.scss'
})
export class ServiceDetailsComponent implements OnInit {

  serviceDetails: any;
  dialogOpen: boolean = false;
  serviceDetailsHeader: any;
  imageUrl = environment.IMAGE_URL;

  dialog = inject(MatDialog);
  dataService = inject(DataService);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getServiceDetailsById(
      this.activatedRoute.snapshot.params['id']
    );
    this.getServiceDetailsHeaderData();
  }

  getServiceDetailsById(serviceId: string) {
    this.dataService.getDataById('service-details', serviceId)
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
    this.dataService.getData('service-details-header')
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
      const dialogRef = this.dialog.open(VideoDialogComponent, {
        data: this.serviceDetails?.video_link,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        this.dialogOpen = false;
      });
    }
  }
}
