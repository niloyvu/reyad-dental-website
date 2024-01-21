import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-who-we-are',
  standalone: false,
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.scss'
})
export class WhoWeAreComponent implements OnInit {

  whoWeAreData: any;
  imageUrl = environment.IMAGE_URL;

  dataService = inject(DataService);

  ngOnInit(): void {
    this.getWhoAreData();
  }
  
  getWhoAreData() {
    this.dataService.whoWeAre()
      .subscribe({
        next: ({ data }) => {
          this.whoWeAreData = data;
          console.log("🚀 ~ WhoWeAreComponent ~ getWhoAreData ~ this.whoWeAreData:", this.whoWeAreData)
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
