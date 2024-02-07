import { Subscription } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.scss'
})

export class WhoWeAreComponent implements OnInit, OnDestroy {

  whoWeAreData: any;
  imageUrl = environment.IMAGE_URL;

  private subscription$!: Subscription;
  private dataService = inject(DataService);

  ngOnInit(): void {
    this.getWhoAreData();
  }

  getWhoAreData() {
    this.subscription$ = this.dataService
      .getData('who-we-are')
      .subscribe({
        next: ({ data }) => {
          this.whoWeAreData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
