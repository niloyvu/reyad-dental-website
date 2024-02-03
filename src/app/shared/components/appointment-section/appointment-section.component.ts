import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';
import { bookingDateValidator } from '../../validators/booking-date';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';

@Component({
  selector: 'app-appointment-section',
  templateUrl: './appointment-section.component.html',
  styleUrl: './appointment-section.component.scss',
})
export class AppointmentSectionComponent implements OnInit {

  appointmentForm!: FormGroup;
  isSubmitted = false;

  counters: any[] = [];
  dentists: any[] = [];

  appointmentSectionData: any;
  dialogOpen: boolean = false;

  sliderValue: number = 50;

  dialog = inject(MatDialog);
  toastr = inject(ToastrService);
  imageUrl = environment.IMAGE_URL;
  formBuilder = inject(FormBuilder);
  dataService = inject(DataService);

  ngOnInit(): void {
    this.initializeForm();
    this.getActiveDentists();
    this.getCounterSection();
    this.getAppointmentSectionData();
  }

  initializeForm() {
    this.appointmentForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      email: [null, [Validators.email, Validators.required]],
      dentist_id: [0, [Validators.required]],
      department_id: [0, [Validators.required]],
      date: [null, [Validators.required, bookingDateValidator.bind(this)]],
      phone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$'),]],
      time: [1, [Validators.required]]
    });
  }

  onSubmit() {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    this.isSubmitted = true;
    this.dataService.postData(this.appointmentForm.value, 'website/web-book-appointment')
      .subscribe({
        next: (response) => {
          this.isSubmitted = false;
          if (response.code == 200) {
            this.appointmentForm.reset();
            this.toastr.success(response.message);
          } else {
            this.toastr.error('Form Submission Failed!');
          }
        },
        error: error => {
          console.error(error);
          this.isSubmitted = false;
          this.toastr.error('Form Submission Failed!');
        }
      });

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

  onClickOpenVideoModal() {
    if (!this.dialogOpen) {
      const dialogRef = this.dialog.open(VideoDialogComponent, {
        data: this.appointmentSectionData?.video_link,
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
}
