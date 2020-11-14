import { Component, OnInit } from '@angular/core';
//import { SocialSharing, Calendar } from '@ionic-native/social-sharing';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { AlertController } from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  public item: any;
  public headerImage: string;

  constructor(private socialSharing: SocialSharing, private calendar: Calendar,
              private route: ActivatedRoute, private router: Router,
              private alertCtrl: AlertController) { }

  // shareMe(msg, subject, image, link) {
  //   console.log(msg + ' , ' + subject + ' , ' + image + ' , ' + link);
  //   this.socialSharing.share(msg, subject, 'file:///'+image, link);
  // }

  shareUs(item) {
    let options = {
      message: 'Event: \n'+item.title, // not supported on some apps (Facebook, Instagram)
      subject: item.title, // fi. for email
      files: [item.images.imageMedium], // an array of filenames either locally or remotely
      url: 'https://www.winnerschapelny.org',
      chooserTitle: 'WCINY' // Android only, you can override the default share sheet title
    }

    this.socialSharing.shareWithOptions(options).catch((err) => {
      console.log(err);
    });
  }

  doHTML(str,rem){
    console.log(str);
    return str.replace(/<(?:.|\n)*?>/gm, '').replace(rem,'');

  }

  doDate (d, t){
    let str = d.slice(0,10)+' '+t;
    console.log(str);
    return new Date(str);

  }

  createEvent(item) {
    let start = this.doDate(item.event_date, item.event_time);
    let end = this.doDate(item.event_date, item.event_time);

    this.calendar.createEventInteractively(
        item.introtext,
        item.event_venue,
        this.doHTML(item.content,item.introtext),
        new Date(start),
        new Date(end)
    ).then(
        (msg) => {
          this.presentAlert('Event Calendar',item.introtext + " has been added to your calendar.");
          console.log(msg);
          },
        (err) => { console.log("Calendar fail " + err); }
    );
  }
  async presentAlert(title,msg) {
    const alert = await this.alertCtrl.create({
      //cssClass: 'my-custom-class',
      header: title,
      //subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.item = this.route.snapshot.data['special'];
      this.headerImage = this.item.images.imageLarge ?  this.item.images.imageLarge : 'assets/img/events_side.jpg';
    }
  }

}
