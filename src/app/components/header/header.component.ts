import { RouterLink } from '@angular/router';
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

  dataService = inject(DataService);
  headerData: any = [];

  ngOnInit() {
    this.getHeaderSectionData();
  }

  getHeaderSectionData() {
    this.dataService.headerSection()
      .subscribe(({ data }) => {
        this.headerData = data;
      })
  }


}

