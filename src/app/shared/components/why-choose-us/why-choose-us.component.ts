import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DataService } from '../../../services/data.service';

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
    this.dataService.whyChooseUsSection()
      .subscribe({
        next: ({ data }) => {
          this.whyChooseUsData = data;
          console.log("🚀 ~ WhoWeAreComponent ~ getWhoAreData ~ this.whyChooseUsData:", this.whyChooseUsData)
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
