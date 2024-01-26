import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {

  services: any[] = [];
  serviceHeaderData: any;
  imageUrl = environment.IMAGE_URL;
  dataService = inject(DataService);

  ngOnInit(): void {
      this.getServices();
      this.getServiceHeaderData();
  }

  getServices() {
    this.dataService.getData('active-services')
      .subscribe({
        next: ({ data }) => {
          this.services = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getServiceHeaderData() {
    this.dataService.getData('service-header')
      .subscribe({
        next: ({ data }) => {
          this.serviceHeaderData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
