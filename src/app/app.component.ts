import { Component } from '@angular/core';
import { MobileService } from './services/mobile.service';
import { Platform} from '@ionic/angular';
import { Router } from '@angular/router';
import { ChatModelService } from 'src/app/services/chat-model.service';
import { AppVarsService } from 'src/app/services/app-vars.service'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(mobileService:MobileService, private platform: Platform, private router: Router, private chatService: ChatModelService, public appVars: AppVarsService) {
    this.initializeApp();  
  }
  initializeApp() {
    // this.router.navigate(['files']);
    this.platform.ready().then(() => { 

      if(this.router.url == '/'){
          this.chatService.jwtToken = localStorage.getItem("st_token");
          if (this.chatService.jwtToken && this.chatService.jwtToken.length > 0) {
            console.log(
              "we got a token. goint to welcome page... tok:" +
              this.chatService.jwtToken
            );
            this.router.navigate(['/home-tabs/home']);
            return;
          }
          localStorage.setItem("al", "");
          localStorage.setItem("token", "");

          this.chatService.jwtToken = this.chatService.jwtTokenSite = 
          this.chatService._al = this.appVars.autoToken = null;
          this.loadLoginScreenAds();
      }    
      if(this.router.url == '/home-tabs/home'){
        this.chatService.jwtToken = localStorage.getItem("st_token");
        if (this.chatService.jwtToken && this.chatService.jwtToken.length > 0) {
          console.log("app.welcome. we got a token:" + this.chatService.jwtToken);

        } else {
          this.chatService.jwtToken = null;
          localStorage.setItem("al", "");
          localStorage.setItem("token", "");
          localStorage.setItem("st_token", "");
          this.router.navigate(['/login']);
        }
      }    
    });
  }

  loadLoginScreenAds = () => {

  }



}
