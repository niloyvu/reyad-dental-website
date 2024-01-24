import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';

@Component({
  selector: 'app-appointment-section',
  templateUrl: './appointment-section.component.html',
  styleUrl: './appointment-section.component.scss',
})
export class AppointmentSectionComponent implements OnInit {

  counterSectionData: any;
  appointmentSectionData: any;
  dialogOpen: boolean = false;

  sliderValue: number = 50;

  dialog = inject(MatDialog);
  imageUrl = environment.IMAGE_URL;
  dataService = inject(DataService);

  ngOnInit(): void {
    this.getCounterSection();
    this.getAppointmentSectionData();
  }

  getAppointmentSectionData() {
    this.dataService.getData('appointment-section')
      .subscribe({
        next: ({ data }) => {
          this.appointmentSectionData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
  getCounterSection() {
    this.dataService.getData('counter-section')
      .subscribe({
        next: ({ data }) => {
          this.counterSectionData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  onClickOpenVideoModal() {
    if (!this.dialogOpen) {
      const dialogRef = this.dialog.open(VideoDialogComponent, {
        data: this.appointmentSectionData.video_link,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        this.dialogOpen = false;
      });
    }
  }

  beforeAfter(value: any): void {
    this.sliderValue = value;
  }

  callBeforeAfter(event: any) {
    this.beforeAfter(event.target.value);
  }
}
