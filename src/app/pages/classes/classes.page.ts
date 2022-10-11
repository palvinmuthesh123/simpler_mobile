import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import jwtDecode from 'jwt-decode';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {
  tradingRooms: any = null;
  validRooms: any = null;
  token : any ;
  decodeToken :any ;

  constructor(private router: Router, private appService: AppService,public alertController: AlertController,) {}

  ngOnInit() {
    this.fetchRoomList();
  }

  roomErrorAlert = async(room) => {
    const alert = await this.alertController.create({
      header: "Sorry You don't seem to be signed up for "+ room.name,
      message: 'Please contact Support@simplertrading.com or call 1-855-980-1993 if you need assitance',
      buttons: ['OK'],
    });

    await alert.present();
  }

  roomLogin = (room: any, roomTitle: string, roomImg: string, roomID: number) => {
    if(!room.enabled){
    const goToRoom: NavigationExtras = {
      state: {
        roomTitle,
        roomImg,
        roomID
      },
    };
    this.router.navigate(['/room-login'], goToRoom);
  }else{
    this.roomErrorAlert(room);
    return false
  }

}
  

  fetchRoomList = (): void => {
    this.appService.fetchRoomList().subscribe((data: []) => {
      console.log(data);
      this.tradingRooms = data;

      this.token = window.localStorage.getItem('st_token');
      this.decodeToken = jwtDecode(this.token);
      var userMemberships = this.decodeToken.memberships;
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
