import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-why-choose-us',
  standalone: false,
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.scss'
})
export class WhyChooseUsComponent implements OnInit {

  whyChooseUsData: any;
  imageUrl = environment.IMAGE_URL;

  dataService = inject(DataService);

  ngOnInit(): void {
    this.getWhyChooseUsData();
  }

  getWhyChooseUsData() {
    this.dataService.getData('why-choose-us')
      .subscribe({
        next: ({ data }) => {
          this.whyChooseUsData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
