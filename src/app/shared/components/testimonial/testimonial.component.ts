import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-testimonial',
  standalone: false,
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss'
})
export class TestimonialComponent implements OnInit {

  testimonialSectionData: any;
  imageUrl = environment.IMAGE_URL;

  dataService = inject(DataService);

  ngOnInit(): void {
    this.getTestimonialSectionData();
  }

  getTestimonialSectionData() {
    this.dataService.getData('testimonial-section')
      .subscribe({
        next: ({ data }) => {
          this.testimonialSectionData = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }
}
