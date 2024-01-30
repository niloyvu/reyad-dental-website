import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';
import { CheckoutComponent } from './checkout/checkout.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatButtonModule, CheckoutComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent implements OnInit {

  product: any;
  max = 10000;
  current = 1;

  showCheckout = false;

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
          this.product = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  increment() {
    if (this.max <= 0 || this.current >= this.max)
      return;

    this.current++;
    // this.changeQty.emit( this.current );
  }

  decrement() {
    if (this.current > 1) {
      this.current--;
      // this.changeQty.emit( this.current );
    }
  }
  changeCurrent(event: any) {
    if (parseInt(event.currentTarget.value) < this.max && parseInt(event.currentTarget.value) > 0) {
      this.current = parseInt(event.currentTarget.value);
      // this.changeQty.emit( this.current );
    } else {
      event.currentTarget.value = this.current;
    }
  }

  orderNow() {
    this.showCheckout = true;
  }
}
