import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  settings = [
    {
      icon: 'log-out-outline',
      title: 'Logout',
      fn: '',
    },
    {
      icon: 'information-circle-outline',
      title: 'Account Information',
      fn: '',
    },
    {
      icon: 'notifications-outline',
      title: 'Push Notification Settings',
      fn: '',
    },
    {
      icon: 'shield-outline',
      title: 'Privacy',
      fn: '',
    },
    {
      icon: 'help-circle-outline',
      title: 'Help',
      fn: '',
    },
  ];

  name = '';
  email = '';

  constructor(private router: Router, public alertController: AlertController) {}

  ngOnInit() {
    this.email = window.localStorage.getItem('email');
    this.name = window.localStorage.getItem('name');
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Log Out',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false;
          },
        },
        {
          text: 'OK',
          handler: () => {
            window.localStorage.setItem('token', '');
            window.localStorage.setItem('st_token', '');
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }

  userAccount() {
    window.open('https://www.simplertrading.com/dashboard/account/', '_system', 'location=no,toolbar=yes');
    return false;
  }

  pushNotificationSettings() {
    this.router.navigate(['/push-notification-settings']);
  }

  userPrivacy() {
    window.open('https://www.simplertrading.com/privacy-policy/', '_system', 'location=no,toolbar=yes');
    return false;
  }

  userHelp() {
    window.open('mailto:support@simplertrading.com', '_system');
    return false;
  }
}