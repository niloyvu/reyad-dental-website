import { ToastrService } from 'ngx-toastr';
import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  isSubmitted = false;
  contactForm!: FormGroup;
  contactUsPageData: any;
  imageUrl = environment.IMAGE_URL;

  toastr = inject(ToastrService);
  dataService = inject(DataService);

  ngOnInit(): void {
    this.getContactUsPageContents();

    this.contactForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),
      subject: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(100)
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(100),
        Validators.maxLength(500)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]+$'),
      ]),
      email: new FormControl('',
        [
          Validators.email,
          Validators.required
        ]),
      check: new FormControl(false,
        [
          Validators.requiredTrue
        ]),
    });
  }

  get name() {
    return this.contactForm.get('name');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get subject() {
    return this.contactForm.get('subject');
  }

  get message() {
    return this.contactForm.get('message');
  }
  get check() {
    return this.contactForm.get('check');
  }

  getContactUsPageContents() {
    this.dataService.getData('contact-us')
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
    this.dataService.postData(this.contactForm.value, 'website/web-contact-us').subscribe({
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

}
