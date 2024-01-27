import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  shoPageHeader: any;

  dataService = inject(DataService);
  imageUrl = environment.IMAGE_URL;
  ngOnInit(): void {
      this.getDentistsPageHeaderData();
  }

  getDentistsPageHeaderData() {
    this.dataService.getDataByQueryParams('shop-page-header','?page_type=1')
      .subscribe({
        next: ({ data }) => {
          this.shoPageHeader = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
