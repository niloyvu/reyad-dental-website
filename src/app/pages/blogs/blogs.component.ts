import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blogs',
  standalone: true,
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  imports: [SharedModule]
})
export class BlogsComponent implements OnInit {

  blogPageHeader: any;

  totalItems: number = 0;
  currentPage: number = 1;
  perPageBlogs: number = 6;

  activeBlogs: any[] = [];

  imageUrl = environment.IMAGE_URL;

  private dataService = inject(DataService);
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.getActiveBlogs(this.currentPage);
    this.getBlogPageHeader();
  }

  getActiveBlogs(pageNumber: number) {
    this.currentPage = pageNumber;
    this.dataService
      .getDataByQueryParams(
        'active-blogs', `?page=${pageNumber}&per_page=${this.perPageBlogs}`
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.activeBlogs = data.data;
          this.totalItems = data.total;
        },
        error: error => {
          console.error(error);
        }
      })
  }

  getBlogPageHeader() {
    this.dataService
      .getDataByQueryParams('blog-page-header', '?page_type=1')
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
