import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-push-notification-settings',
  templateUrl: './push-notification-settings.page.html',
  styleUrls: ['./push-notification-settings.page.scss'],
})
export class PushNotificationSettingsPage implements OnInit {
  notificationList = [
    {
      img: 'options-icon.svg',
      title: 'Options',
    },
    {
      img: 'beginner-icon.svg',
      title: 'Trading Room',
    },
    {
      img: 'futures-icon.svg',
      title: 'Futures',
    },
    {
      img: 'bias-icon.svg',
      title: 'BIAS',
    },
    {
      img: 'small-account-mastery-icon.svg',
      title: 'Small Account Mastery',
    },
    {
      img: 'moxie-trader-icon.svg',
      title: 'Moxie Trader',
    },
    {
      img: 'stacked-profits-mastery-icon.png',
      title: 'Stacked Profits Mastery',
    },
    {
      img: 'forex-mastery-icon.png',
      title: 'Forex Mastery',
    },
    {
      img: 'webinar-icon.svg',
      title: 'Options Members Webinars',
    },
    {
      img: 'webinar-icon.svg',
      title: 'Futures Members Webinars',
    },
    {
      img: 'webinar-icon.svg',
      title: 'Free Webinar Room',
    },
    {
      img: 'classroom-icon.svg',
      title: "Bruce's Options Income Mentorship",
    },
    {
      img: 'classroom-icon.svg',
      title: "TG's $100K Day Setup Live Trading",
    },
    {
      img: 'classroom-icon.svg',
      title: "TG's $100K Day Setup Elite Live Trading",
    },
    {
      img: 'classroom-icon.svg',
      title: 'Ultimate Day Trading Strategy',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
