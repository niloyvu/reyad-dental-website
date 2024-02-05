import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';
import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {

  menuState = 'out';
  headerData: any = [];
  show: boolean = false;
  isSticky: boolean = false;

  imageUrl = environment.IMAGE_URL;

  private dataService = inject(DataService);
  private subscription$!: Subscription;

  @HostListener('window:scroll', ['$event'])
  handleScroll(event: Event) {
    const height = 150;
    const scrollTop = (event.target as any).scrollingElement.scrollTop;
    this.isSticky = scrollTop >= height || this.isSticky;
  }

  ngOnInit() {
    this.getHeaderSectionData();
  }

  getHeaderSectionData() {
    this.dataService
      .getData('navbar-section')
      .subscribe({
        next: ({ data }) => {
          this.headerData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  toggleSidebarMenu() {
    this.show = !this.show;
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }


  toggleTheme() {
    const htmlElement = document.querySelector('html');
    if (htmlElement?.classList.contains('theme-light')) {
      htmlElement?.classList.remove('theme-light');
      htmlElement?.classList.add('theme-dark');
    } else {
      htmlElement?.classList.remove('theme-dark');
      htmlElement?.classList.add('theme-light');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}

