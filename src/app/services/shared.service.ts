import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public BroadCastMsg = new Subject<any>();

  constructor() { }

  sendDataPost = (data:any) => {
    this.BroadCastMsg.next(data);
  }

  getObservable = (): Subject<any> => {
    return this.BroadCastMsg;
  }
  

}
