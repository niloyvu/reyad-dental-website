import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../services/data.service';
import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {

  shoPageHeader: any;
  products: any;

  dataService = inject(DataService);
  imageUrl = environment.IMAGE_URL;
  ngOnInit(): void {
    this.getActiveProducts();
    this.getShopPageHeaderData();
  }

  getShopPageHeaderData() {
    this.dataService.getDataByQueryParams('shop-page-header', '?page_type=1')
      .subscribe({
        next: ({ data }) => {
          this.shoPageHeader = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getActiveProducts() {
    this.dataService.getData('active-products')
      .subscribe({
        next: ({ data }) => {
          this.products = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
