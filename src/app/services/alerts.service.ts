import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }
  static alert(msg,cb=null){
    //MDTODO: use ionic alerts/confirm/promt here
    window.alert(msg)
    if (cb){ cb();}
  }
  static confirm(msg,cb){
    //MDTODO: use ionic alerts/confirm/promt here
    /* something like this:
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
            this.router.navigate(['/home-tabs/rooms']);
          },
        },
      ],
    });

    await alert.present();
    */
  }
  static prompt(obj){
    //MDTODO: use ionic alerts/confirm/promt here
  }

  static hideAll(){
    //MDTODO: use ionic alerts/confirm/promt here
  }


  //toasts
  static success(args){
      //MDTODO: use ionic toasts
  }

  static info(args){
    //MDTODO: use ionic toasts
  }

  static error(args){
    //MDTODO: use ionic toasts
  }
  
}
