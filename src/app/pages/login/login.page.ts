import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AppVarsService } from 'src/app/services/app-vars.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  loginval = {
    rememberMe: window.localStorage.getItem("rememberMe") || "false",
    email:window.localStorage.getItem("email") || "",
    password:window.localStorage.getItem("password") || ""
  };

  pwdIcon = "eye-sharp";
  showPwd = false;

  constructor(
    public alertController: AlertController,
    private appVars: AppVarsService,
    private http: HttpClient,
    private router: Router,
    public loadingController: LoadingController
  ) {
    
  }

  ngOnInit() {}

  loginErrorAlert = async () => {
    const alert = await this.alertController.create({
      header: 'Login Error',
      message: 'Check your input and try again...',
      buttons: ['OK'],
    });

    await alert.present();
  }

  showLoginLoading = async () => {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }

   hideLoginLoading = async () => {
    await this.loadingController.dismiss();
  }

  validateEmail(email: string) {
    const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())){
      return false;
    }
    return true;
  }

  login = async(formData) => {
    const loginURL = this.appVars.globals.stSSOURL + 'st_token';
    console.log(loginURL,"loginURL")
    const { email, password, rememberMe } = formData.form.value;
    if(!email){
      this.validateUserForm("email");
      return false;
    }

    if(!password){
      this.validateUserForm("password");
      return false;
    }

    if (this.validateEmail(email) || password.length < 6) {
      this.validateUserForm("email");
      return false;
    }
    this.showLoginLoading();
    const loginData = {
      username: email,
      password: password,
    };

    const login_response = await this.http.post<any>(loginURL, loginData).toPromise()
                    .then(res => { return res })
                    .catch((err) => { return err });

    console.log(login_response,"login_response")

    if (login_response.rc === 'OK') {
      this.hideLoginLoading();
      const { email: userEmail, name, token } = login_response;
      window.localStorage.setItem('email', userEmail);
      window.localStorage.setItem('password', password);
      window.localStorage.setItem('rememberMe', rememberMe);
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('st_token', token);
      this.router.navigate(['home-tabs/home']);
    } else {
      this.hideLoginLoading();
      this.loginErrorAlert();
      return false;
    }
    return false;
  }

  doForgotPW = () =>{
    window.open(
      this.appVars.globals.forgot+"dashboard/account/lost-password/",
      "_system",
      "location=no,toolbar=yes"
    );
  };

  doForgetMe = (formData) => {
    
    if (localStorage.getItem("email") !== null && localStorage.getItem("email") !=="") {
      formData.form.reset();
      window.localStorage.setItem("st_token","");
      window.localStorage.setItem("email","");
      window.localStorage.setItem("password","");
      window.localStorage.setItem("rememberMe","");
    }
  };

  validateUserForm = async(message) => {
    const alert = await this.alertController.create({
      header: 'Login Error',
      message: 'Kindly enter a valid '+message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  togglePwd = ()=> {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? "eye-off-sharp" : "eye-sharp";
  }
}
