import { Subject, takeUntil } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit, OnDestroy {

  products: any;
  shoPageHeader: any;

  totalItems: number = 0;
  currentPage: number = 1;
  perPageProducts: number = 8;

  imageUrl = environment.IMAGE_URL;
  private dataService = inject(DataService);
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.getActiveProducts(this.currentPage);
    this.getShopPageHeaderData();
  }

  getShopPageHeaderData() {
    this.dataService
      .getDataByQueryParams('shop-page-header', '?page_type=1')
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

  getActiveProducts(pageNumber: number) {
    this.currentPage = pageNumber;
    this.dataService
      .getDataByQueryParams(
        'active-products', `?page=${pageNumber}&per_page=${this.perPageProducts}`
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.products = data.data;
          this.totalItems = data.total;
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
