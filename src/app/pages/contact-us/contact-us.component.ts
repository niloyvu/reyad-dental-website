import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit, OnDestroy {

  isSubmitted = false;
  contactForm!: FormGroup;
  contactUsPageData: any;
  imageUrl = environment.IMAGE_URL;

  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  private dataService = inject(DataService);

  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.initializeForm();
    this.getContactUsPageContents();
  }

  initializeForm() {
    this.contactForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      subject: [null, [Validators.required, Validators.minLength(20), Validators.maxLength(100)]],
      message: [null, [Validators.required, Validators.minLength(100), Validators.maxLength(500)]],
      phone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
      email: [null, [Validators.email, Validators.required]],
      check: [false, [Validators.requiredTrue]],
    });

  }

  getContactUsPageContents() {
    this.dataService
      .getData('contact-us')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.contactUsPageData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitted = true;
    this.dataService
      .postData(this.contactForm.value, 'website/web-contact-us')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          this.isSubmitted = false;
          if (response.code == 200) {
            this.contactForm.reset();
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
