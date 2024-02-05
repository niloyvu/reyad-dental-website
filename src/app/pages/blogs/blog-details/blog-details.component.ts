import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit, OnDestroy {

  blog: any;
  blogPageHeader: any;

  imageUrl = environment.IMAGE_URL;
  
  private unsubscribe$ = new Subject<void>();
  
  private dataService = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getBlogDetailsById(
      this.activatedRoute.snapshot.params['id']
    );
    this.getBlogPageHeader();
  }

  getBlogDetailsById(blogId: string) {
    this.dataService
      .getDataById('blog-details', blogId)
      .pipe(takeUntil(this.unsubscribe$))
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
    this.dataService
      .getDataByQueryParams('blog-page-header', '?page_type=2')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.blogPageHeader = data;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
