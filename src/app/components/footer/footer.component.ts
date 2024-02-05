import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';
import { Component, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {

  email: string = '';
  isSubmitted = false;
  headerData: any = [];
  footerData: any = [];

  buttonOpacity: number = 0;
  newsletterSectionData: any;
  imageUrl = environment.IMAGE_URL;

  private toastr = inject(ToastrService);
  private dataService = inject(DataService);
  private unsubscribe$ = new Subject<void>();

  @ViewChild('subscribeForm') subscribeForm!: NgForm;

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
    this.getHeaderSectionData();
    this.getNewsletterSectionData();
  }

  getFooterSectionData() {
    this.dataService
      .getData('footer-section')
      .pipe(takeUntil(this.unsubscribe$))
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
    this.dataService
      .getData('newsletter-section')
      .pipe(takeUntil(this.unsubscribe$))
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
    this.dataService
      .postData({ 'email': this.email }, 'website/subscription')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
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

  getHeaderSectionData() {
    this.dataService
      .getData('navbar-section')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.headerData = data;
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
