import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { element } from 'protractor';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {
  tradingRooms: any = null;
  validRooms: any = null;
  token : any ;
  decodeToken :any ;
  rooms = [
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
  ];

  constructor(private router: Router, private appService: AppService) {}

  ngOnInit() {
    this.fetchRoomList();
  }

  roomLogin = (room: any, roomTitle: string, roomImg: string, roomID: number) => {
    const goToRoom: NavigationExtras = {
      state: {
        roomTitle,
        roomImg,
        roomID,
      },
    };
    this.router.navigate(['/room-login'], goToRoom);
  }

  fetchRoomList = (): void => {
    this.appService.fetchRoomList().subscribe((data: []) => {
    
      this.tradingRooms = data;
      this.token = window.localStorage.getItem('st_token');
      this.decodeToken = jwtDecode(this.token);
      var userMemberships =  this.decodeToken.memberships || [];
      var userProducts = this.decodeToken.products || [];
      var userPermissions = this.decodeToken.permissions || [];
      this.validRooms = this.appService.validfetchRoomList(this.tradingRooms , userMemberships ,userProducts);
      this.tradingRooms = this.validRooms;
     
  });

}


  getRoomIcon = (iconUrl: string): string => {
    if (iconUrl.match(/\bhttp[^ ]+/gi)) {
      return iconUrl;
    } else {
      return `./assets/${iconUrl}`;
    }
  }

  ionViewDidEnter = () =>{
    this.fetchRoomList();
  }
}
