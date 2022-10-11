import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatModelService } from 'src/app/services/chat-model.service';
import { WebRTCStreamService } from 'src/app/services/web-rtcstream.service';
import { AppVarsService } from 'src/app/services/app-vars.service';
import { SharedService  } from 'src/app/services/shared.service';
@Component({
  selector: 'app-screens',
  templateUrl: './screens.page.html',
  styleUrls: ['./screens.page.scss'],
})
export class ScreensPage implements OnInit {
  isPresenting = true;
  watchingScreenOf: any = null;
  pStream:any=null;
  chatServer:any;
  sessID:any;
  authMode:any;
  roomID:any;
  service:any;
  Presenter:[]=[];
  Presenter_Name:string;  
  ScreenShare:boolean;
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    public appService: AppService, 
    public chatService: ChatModelService, 
    public webStream: WebRTCStreamService,
    public appVars: AppVarsService,
    public shared: SharedService,    
    ) {
      this.ScreenShare = false;
      this.shared.getObservable().subscribe((data) => {
      });
    }

  ngOnInit() {

  }
}