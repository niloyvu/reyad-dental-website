import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-why-choose-us',
  standalone: false,
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.scss'
})
export class WhyChooseUsComponent implements OnInit, OnDestroy {

  whyChooseUsData: any;
  imageUrl = environment.IMAGE_URL;

  private subscription$!: Subscription;
  private dataService = inject(DataService);

  ngOnInit(): void {
    this.getWhyChooseUsData();
  }

  getWhyChooseUsData() {
    this.subscription$ = this.dataService.getData('why-choose-us')
      .subscribe({
        next: ({ data }) => {
          this.whyChooseUsData = data;
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
