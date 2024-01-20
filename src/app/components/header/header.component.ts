import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  httpClient = inject(HttpClient);
  dataService = inject(DataService);
  headerData: any = [];

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.dataService.getHeaderSectionData()
      .subscribe(({ data }) => {
        this.headerData = data;
        console.log("🚀 ~ HeaderComponent ~ .subscribe ~ this.data:", this.headerData)
      })
  }
}

