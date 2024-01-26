import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';

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
    this.dataService.getData('who-we-are')
      .subscribe({
        next: ({ data }) => {
          this.whoWeAreData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
