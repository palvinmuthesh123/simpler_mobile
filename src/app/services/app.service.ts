import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
import { Globaldata } from '../globaldata';
import { Emitter } from '../utils/emitter';
import { lg } from '../utils/logger';
import { AppVarsService } from './app-vars.service';

const UAParser: any = (window as any).UAParser;

@Injectable({
  providedIn: 'root',
})
export class AppService {
  freeVideosFeed: any = null;
  rooms: any = null;
  public globals: Globaldata;
  appConfig = {};
  constructor(
    private httpClient: HttpClient,
    private appVarsService: AppVarsService,
  ) {   
    this.getAppConfig();
    this.globals = new Globaldata();
  }
  fetchFreeVideos(): Observable<object[]> {
    this.freeVideosFeed = this.httpClient.get<any>(this.appVarsService.globals.DAILY_FEED);

    return this.freeVideosFeed;
  }

  fetchRoomList(): Observable<object[]> {
     this.rooms = this.httpClient.get<any>(`${this.appVarsService.globals.APIURL}/public/mobile/st_rooms_new.json`);
    // this.rooms = this.httpClient.get('../../assets/temproom.json');
    return this.rooms;
  }
   getAppConfig= async () => {
    const data = await this.httpClient.get<any>(this.appVarsService.globals.APIURL + '/public/mobile/st_app_config.json').toPromise();
    
    if (data) {
      this.appConfig = data;
      console.log(this.appVarsService.globals.APIURL + '/public/mobile/st_app_config.json:', data);
    }
    console.log(this.appVarsService.globals.APIURL + '/public/mobile/st_app_config.json:', data);

  }

  validfetchRoomList = (rooms, user_memberships = [], user_classes = []) =>{
		 
    for (const room of rooms) {
    //check if room is disabled for ALL users
    if (room.enabled === false) continue
    //default room to disabled: unless an authorization match is found
    room.enabled = false;
    const room_memberships = typeof room.memberships === 'string' ? room.memberships.split('|') : null;
    const room_classes = typeof room.products === 'string' ? room.products.split('|') : null;
    if (room_memberships !== null) {
      if (this.intersectArrays(room_memberships, user_memberships) === true) { 
        room.enabled = true; 
        continue;
      }
    }
    //assumes both arrays hold ints that are represented as strings (instead of numbers)
      //explicit parsing of strings into intgers/numbers would be safer
    if (room_classes !== null) {
         if (this.intersectArrays(room_classes, user_classes) === true) room.enabled = true;
    }
  }

  return rooms;
}

 intersectArrays = (roomPermission, userPermission) => {
      return roomPermission.some(function array_has_value(value) { 
         return userPermission.includes(value);
     })
  }

  refreshTokenAndList(): Observable<object[]> {
    var d = {
      username: "",
      password: "",
      prevTok: localStorage.getItem("st_token"),
    };

      const refreshToken = this.httpClient.post<any>(`${this.appVarsService.globals.stSSOURL}st_token`, d);
      return refreshToken;
 }

  alertMsgList(data): Observable<object[]> {
    const alertNotifyMsg = this.httpClient.post<any>(`${this.appVarsService.globals.APIURL}/users/v1/st_app`, data);
    return alertNotifyMsg;
  }

}