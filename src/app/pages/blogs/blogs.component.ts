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
  activeBlogs: any[] = [];

  imageUrl = environment.IMAGE_URL;

  private dataService = inject(DataService);
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.getActiveBlogs();
    this.getBlogPageHeader();
  }

  getActiveBlogs() {
    this.dataService
      .getData('active-blogs')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ data }) => {
          this.activeBlogs = data;
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
