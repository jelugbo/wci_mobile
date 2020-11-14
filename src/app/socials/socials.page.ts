import { Component, OnInit } from '@angular/core';
import {InAppBrowser, InAppBrowserOptions} from "@ionic-native/in-app-browser/ngx";
import {DataService} from "../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-socials',
  templateUrl: './socials.page.html',
  styleUrls: ['./socials.page.scss'],
})
export class SocialsPage implements OnInit {
  public itemColumns = [
/*    {
      title: 'About WCINY',
      icon: 'information-circle-outline',
      text: 'Learn About Us',
      isURL: true,
      link: ''
    },*/{
      title: 'One on One with Our Resident Pastor',
      icon: 'information-circle',
      text: 'Schedule Pastoral Appointment',
      isURL: false,
      link: 'pastor'
    },{
      title: 'Youtube',
      icon: 'logo-youtube',
      text: 'Watch Our Channel',
      isURL: true,
      link: 'https://www.youtube.com/channel/UCcaUxWoaZRUhnwFfBkXTLPw'
    },{
      title: 'Twitter',
      icon: 'logo-twitter',
      text: 'Connect With Us',
      isURL: true,
      link: 'https://twitter.com/WINNERSCHAPELNY'
    },{
      title: 'Facebook',
      icon: 'logo-facebook',
      text: 'Connect With Us',
      isURL: true,
      link: 'https://www.facebook.com/winners.chapelNewYork'
    },

  ];
  constructor(private apiCall:DataService, private appBrowser: InAppBrowser, public navCtrl: Router) { }
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'pagesheet',//iOS only
    fullscreen : 'yes',//Windows only
  };
  public cordovaBrowse(url : string){
    let target = "_self";
    this.appBrowser.create(url,target,this.options);
  }

  public systemBrowse(url : string){
    let target = "_system";
    this.appBrowser.create(url,target,this.options);
  }

  navigate(opt, isURL) {
    console.log(opt)
    /*switch (opt) {
      case 'twitter':
        link = 'https://twitter.com/WINNERSCHAPELNY';
        break;
      case 'facebook':
        link ='https://www.facebook.com/winners.chapelNewYork';
        break;
      case 'instagram':
        link ='https://www.instagram.com/winnerschapelny/';
        break;
      case 'transport':
        link = 'https://winnerschapelny.org/give';
        break;
      case 'testimony':
        link = '/testimony';
        break;
      case 'prayers':
        link = '/prayer';
        break;
      case 'pastor':
        link = '/pastor';
        break;
      default:
        link='/home';
        isURL=false;
        break;
    }*/
    isURL ? this.systemBrowse(opt) : this.navCtrl.navigate([opt]);

  }
  ngOnInit() {
  }

}
