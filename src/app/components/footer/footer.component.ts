import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { Component, HostListener, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  isSubmitted = false;
  email: string = '';
  newsletterSectionData: any;

  toastr = inject(ToastrService);
  dataService = inject(DataService);

  @ViewChild('subscribeForm') subscribeForm!: NgForm;

  imageUrl = environment.IMAGE_URL;
  footerData: any = [];

  buttonOpacity: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    
    const scrollPosition = window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop || 0;

    if (scrollPosition > 200) {
      this.buttonOpacity = 1;
    } else {
      this.buttonOpacity = 0;
    }
  }

  ngOnInit() {
    this.getFooterSectionData();
    this.getNewsletterSectionData();
  }

  getFooterSectionData() {
    this.dataService.getData('footer-section')
      .subscribe({
        next: ({ data }) => {
          this.footerData = data;
        },
        error: error => {
          console.error(error)
        }
      })
  }

  getNewsletterSectionData() {
    this.dataService.getData('newsletter-section')
      .subscribe({
        next: ({ data }) => {
          this.newsletterSectionData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  scrollToTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSubmit() {
    this.dataService.postData({ 'email': this.email }, 'website/subscription').subscribe({
      next: (response) => {
        this.isSubmitted = false;
        this.subscribeForm.resetForm();
        this.toastr.success(response.message);
      },
      error: error => {
        console.error(error);
        this.isSubmitted = false;
        this.toastr.error('Subscription Failed!');
      }
    });
  }

}
