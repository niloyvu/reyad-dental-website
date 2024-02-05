import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../../../services/data.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { environment } from '../../../../environments/environment';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatButtonModule, CheckoutComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent implements OnInit, OnDestroy {

  product: any;
  quantity = 1;
  maxQuantity = 100;

  showCheckout = false;
  shoPageHeader: any;
  imageUrl = environment.IMAGE_URL;

  private dataService = inject(DataService);
  private unsubscribe$ = new Subject<void>();
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getProductDetailsById(
      this.activatedRoute.snapshot.params['id']
    );
    this.getShopDetailsPageHeaderData();
  }

  getShopDetailsPageHeaderData() {
    this.dataService
      .getDataByQueryParams('shop-page-header', '?page_type=2')
      .pipe(takeUntil(this.unsubscribe$))
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
    this.dataService
      .getDataById('product-details', productId)
      .pipe(takeUntil(this.unsubscribe$))
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
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  orderNow() {
    this.showCheckout = true;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
