import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage implements OnInit {
  newsTitle: string;
  newsDate: string;
  newsBody: string;
  newsPremium: string;
  index : number;
  data : any;
  last : number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state.last, "this.router.getCurrentNavigation().extras.state.ind");
        this.data = this.router.getCurrentNavigation().extras.state;
        this.index = this.router.getCurrentNavigation().extras.state.ind;
        this.last = this.router.getCurrentNavigation().extras.state.last;
        this.newsTitle = this.router.getCurrentNavigation().extras.state.news[this.index].post_title;
        this.newsDate = this.router.getCurrentNavigation().extras.state.news[this.index].post_date;
        this.newsBody = this.router.getCurrentNavigation().extras.state.news[this.index].acf;
        this.newsPremium = this.router.getCurrentNavigation().extras.state.news[this.index].access;
      }
    });
  }

  async increase() {
  this.index = this.index + 1
  console.log(this.index,"Index")
  console.log(this.last,"Last")
  if(this.index<=this.last)
  {
  this.newsTitle = this.data.news[this.index].post_title;
  this.newsDate = this.data.news[this.index].post_date;
  this.newsBody = this.data.news[this.index].acf;
  this.newsPremium = this.data.news[this.index].access;
  }
  else
  {
    const toast = await this.toastController.create({
      message: 'Your have reached the final Data.',
      duration: 2000
    });
    toast.present();
  }
}

  satizerUrl(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
