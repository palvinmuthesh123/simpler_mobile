import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  newsList: any = null;
  appConfig = {};
  constructor(private appService: AppService, private router: Router) {}

  ngOnInit() {
    this.fetchFreeVideos();
  }

  ngAfterViewInit() {}

  fetchFreeVideos(): void {
    this.appService.fetchFreeVideos().subscribe((data: []) => {
      console.log(data,"Datas");
      this.newsList = data;
      this.appConfig = this.appService.appConfig;
    });
  }

  newsDetails(news, index: number, last: number) {
    const newsData: NavigationExtras = {
      state: {
        news,
        ind: index,
        last: this.newsList.length
      },
    };
    this.router.navigate(['/news-details'], newsData);
  }
}
