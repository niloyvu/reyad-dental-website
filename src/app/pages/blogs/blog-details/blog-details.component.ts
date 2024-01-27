import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit {

  blogPageHeader: any;
  blog: any;

  imageUrl = environment.IMAGE_URL;
  dataService = inject(DataService);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getBlogDetailsById(
      this.activatedRoute.snapshot.params['id']
    );
    this.getBlogPageHeader();
  }

  getBlogDetailsById(blogId: string) {
    this.dataService.getDataById('blog-details', blogId)
      .subscribe({
        next: ({ data }) => {
          this.blog = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getBlogPageHeader() {
    this.dataService.getDataByQueryParams('blog-page-header', '?page_type=2')
      .subscribe({
        next: ({ data }) => {
          this.blogPageHeader = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

}
