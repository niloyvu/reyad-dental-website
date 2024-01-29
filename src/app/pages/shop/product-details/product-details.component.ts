import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent implements OnInit {

  product: any;
  shoPageHeader: any;
  dataService = inject(DataService);
  imageUrl = environment.IMAGE_URL;

  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getProductDetailsById(
      this.activatedRoute.snapshot.params['id']
    );
    this.getShopDetailsPageHeaderData();
  }

  getShopDetailsPageHeaderData() {
    this.dataService.getDataByQueryParams('shop-page-header', '?page_type=2')
      .subscribe({
        next: ({ data }) => {
          this.shoPageHeader = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getProductDetailsById(productId: string) {
    this.dataService.getDataById('product-details', productId)
      .subscribe({
        next: ({ data }) => {
          console.log("🚀 ~ ProductDetailsComponent ~ getProductDetailsById ~ data:", data)
          this.product = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
