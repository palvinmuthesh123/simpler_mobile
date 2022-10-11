import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoSanitizePipe } from './pipes/no-sanitize.pipe';
import { ParseLinksPipe } from './pipes/parse-links.pipe';
import { Device } from '@ionic-native/device/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@NgModule({
  declarations: [AppComponent, NoSanitizePipe, ParseLinksPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    //FCM, //TODO FROM ST
    Device,
    StatusBar,
    SplashScreen,
    NativeAudio,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
