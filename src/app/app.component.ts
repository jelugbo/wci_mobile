import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { InfoService } from './services/info.service';
import {InAppBrowserOptions, InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent{
  public selectedIndex = 0;
  items = [];
  public appPages = [
    {
      title: 'Home',
      url: '/tabs',
      icon: 'home',
      isURL: false
    }, {
      title: 'WOFBI',
      url: '/wofbi',
      icon: 'school',
      isURL: false
    },
    {
      title: 'Service Reservation',
      url: '/reservation',
      icon: 'enter',
      isURL: false
    },
    {
      title: 'Prayer Request',
      url: '/prayer',
      icon: 'flame',
      isURL: false
    },
    {
      title: 'Submit Testimony',
      url: '/testimony',
      icon: 'document-text',
      isURL: false
    },
    {
      title: 'Get Connected',
      url: '/socials',
      icon: 'wifi',
      isURL: false
    },
    {
      title: 'Notification',
      url: '/notification',
      icon: 'notifications',
      isURL: false
    },
    {
      title: 'Domi Radio',
      opt: 'radio',
      url: 'http://radio.shoutcastmedia.net:8302/stream',
      icon: 'mic',
      isURL: true
    },
    {
      title: 'Bible Study Note',
      url: '/notes',
      icon: 'tv',
      isURL: false
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private push: FCM,
    private nativeStorage: NativeStorage,
    private navCtrl: Router,
    private alertCtrl: AlertController,
    private appBrowser: InAppBrowser,
    private infoService: InfoService,
    private storage: Storage
  ) {
    this.initializeApp();
  }
  options: InAppBrowserOptions = {
    location : 'yes', // Or 'no'
    hidden : 'no', // Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes', // Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', // Android only
    closebuttoncaption : 'Close', // iOS only
    disallowoverscroll : 'no', // iOS only
    toolbar : 'yes', // iOS only
    enableViewportScale : 'no', // iOS only
    allowInlineMediaPlayback : 'no', // iOS only
    presentationstyle : 'pagesheet', // iOS only
    fullscreen : 'yes', // Windows only
  };

  initializeApp() {
    this.platform.ready().then(() => {
      // console.log(this.platform.platforms());
      const env = this;
      this.storage.get('profile')
          .then( (data) => {
            // console.log(data);
            (data === null) ? console.log('No Profile Stored') : env.items = JSON.parse(data);
            env.initPushNotification();
              /*env.addItem('AppLaunched',true);*/
          }, (error) => {
            // we don't have the user data so we will ask him to log in
            console.log('No Profile Stored ' + error);
            env.initPushNotification();
           /* env.addItem('AppLaunched',true);*/
          });
      this.statusBar.styleDefault();
      /*this.splashScreen.hide();*/
    });
  }


  save() {
    /*this.nativeStorage.setItem('profile', JSON.stringify(this.items));*/
    const store = this.storage.set('profile', JSON.stringify(this.items));
  }


  addItem(idKey, val) {
    if (this.items.length > 0){
      const obj = this.items.filter((o) => o[idKey])[0];
      // console.log(obj);
      if (typeof obj !== 'undefined'){
        if (obj[idKey] !== val && idKey !== 'Token') { this.items.push({[idKey] : val}); }
      }else{
        this.items.push({[idKey] : val});
      }
    }else{
      this.items.push({[idKey] : val});
    }
    console.log(this.items);
    this.save();
  }


  initPushNotification(){
    /* Push Notification Starts*/
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    // to check if we have permission
    this.push.hasPermission()
        .then((res: any) => {
          (res) ? console.log('We have permission for push notifications') : console.warn('No Push Permissions');
        });

    this.push.getToken().then(token => {
      this.addItem('Token', token);
      console.log('Device Token: ', token);
    });
    // refresh the FCM token
    this.push.onTokenRefresh().subscribe(token => {
      this.addItem('Token', token);
      console.log('Device Token Refreshed: ', token);
    });

    // ionic push notification
    this.push.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        const alert = this.presentAlert(data);
      } else {
        const alert = this.presentAlert(data);
      }
    });
    /* Push Notification Ends*/
  }

  async presentAlert(data) {
    const alert = await this.alertCtrl.create({
      header: data.title,
      message: data.body,
      buttons: ['OK']
    });

    await alert.present();
  }

  openEmbed(opt){
    this.infoService.setData(1, opt);
    this.navCtrl.navigateByUrl('/give/1');
  }

  public cordovaBrowse(url: string){
    const target = '_self';
    this.appBrowser.create(url, target, this.options);
  }
}
