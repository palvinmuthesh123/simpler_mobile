import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonContent, IonVirtualScroll } from '@ionic/angular';
import { AlertsService } from '../../services/alerts.service';
import { AppService } from '../../services/app.service';
import { lg } from '../../utils/logger';
// declare var window: any;
// const $ = (window as any).$;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('chatList') chatList: any;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  chatLogs: any = null;
  showSearchbar = false;
  channel = 'main';
  appEventBus: any;
  guiEventBus: any;
  chatMessage = '';
  // tabs
  // chatTabs = ['Support', 'Admin', 'Main', 'Charts', 'Trades', 'Off Topic'];
  chatTabs = [];
  msgs = [];
  unreadMsgs = {};

  myname = '';
  canPost: boolean;
  isPresenter: boolean;
  displayMode = 'r';
  isConnected: boolean;
  chatEnabled: boolean;
  webinarMode: boolean;
  soundEffectsService: any;
  canPostImages: boolean;
  chatMutedTill: any;
  searchTerm = '';
  isScrollingUp = false;
  badges: string = '';

  constructor(private appService: AppService, private router: Router) {

  }

  ngOnInit() {
    
  }
  /* lifecycle events */
  ionViewWillEnter() {
    lg("chat ionViewWillEnter")
    } 
 

}