import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  public menuState = 'out';
  isSticky: boolean = false;
  show: boolean = false;

  dataService = inject(DataService);
  imageUrl = environment.IMAGE_URL;

  headerData: any = [];

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
    this.dataService.getData('navbar-section')
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
    console.log('toggle sidebar menu');
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
}

