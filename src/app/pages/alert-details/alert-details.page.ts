import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alert-details',
  templateUrl: './alert-details.page.html',
  styleUrls: ['./alert-details.page.scss'],
})
export class AlertDetailsPage implements OnInit {
  alertTitle: string;
  alertBody: string;
  alertDate: string;
  alertAuthor: string;
  authorAvatar: string;
  imgUrl:any;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.alertTitle = this.router.getCurrentNavigation().extras.state.alert.title;
        this.alertBody = this.router.getCurrentNavigation().extras.state.alert.text;
        this.alertDate = this.router.getCurrentNavigation().extras.state.alert.time;
        this.alertAuthor = this.router.getCurrentNavigation().extras.state.alert.user;
        this.authorAvatar = this.router.getCurrentNavigation().extras.state.alert.email;
        this.imgUrl = this.router.getCurrentNavigation().extras.state.alert.img;
      }
    });
  }
}
