import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

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

  onClickShowSideBarMenu() {
    this.show = !this.show;
  }

  toggleTheme() {

  }
}

