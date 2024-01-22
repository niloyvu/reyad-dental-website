import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Component, OnInit, inject } from '@angular/core';
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

  dataService = inject(DataService);
  imageUrl = environment.IMAGE_URL;

  headerData: any = [];

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


}

