import { Component, OnInit } from '@angular/core';
import { SharedService  } from 'src/app/services/shared.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { UserInfoPage } from 'src/app/pages/user-info/user-info.page'
import { ChatModelService } from 'src/app/services/chat-model.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  showSearchbar = false;
  roster: any[]=[];
  presenter: any[]=[];
  userSearchTermTxt: string;

  constructor(private route: ActivatedRoute, private router: Router, public chatService: ChatModelService, public shared: SharedService, public loadingController: LoadingController, private modalController: ModalController) {

    if(this.roster == null || this.roster == undefined || this.roster.length == 0){
      this.roster = JSON.parse(localStorage.getItem('rosterArr'));
    }
    if(this.presenter == null || this.presenter == undefined || this.presenter.length == 0){
      this.presenter = JSON.parse(localStorage.getItem('presenterArr'));
    }
    if(this.roster != null || this.roster != undefined && this.presenter != null || this.presenter != undefined){
      this.shared.getObservable().subscribe((data) => {
  
        if(data.Name == 'getRosterList'){
          localStorage.removeItem('rosterArr');
          this.getRosterList(data.Value);          
        }
        if(data.Name == 'getPresenter'){
          localStorage.removeItem('presenterArr');
          this.getPresenter(data.Value);          
        }
      });
    }
    
  }

  ngOnInit() {

  }


  getRosterList = (data) =>{
    if(data == undefined || data == null || data == ''){
      this.roster = [];
    }
    else{
      this.roster = data;
    }    
  }

  getPresenter = (val) =>{
    if(val == undefined || val == null || val == ''){
      this.presenter = [];
    }
    else{
      this.presenter = val;
    }    
  }

  doUserInfo = async(user) => {
    if (this.chatService.isPresenter()){
      this.chatService.send('getUserInfo',user.uid);
    }
    else {
      const modal = await this.modalController.create({
        component: UserInfoPage,
        componentProps: {
          data: user
        }
      });
      return await modal.present();

    }

  }

  ionViewWillEnter() {
  }

}