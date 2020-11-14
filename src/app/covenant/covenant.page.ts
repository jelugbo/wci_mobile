import { Component, OnInit } from '@angular/core';
import { SocialSharing} from '@ionic-native/social-sharing/ngx';
import { ModalController } from "@ionic/angular";
import { DataService } from "../services/data.service";
import { Ionic4DatepickerModalComponent } from "@logisticinfotech/ionic4-datepicker";

@Component({
  selector: 'app-covenant',
  templateUrl: './covenant.page.html',
  styleUrls: ['./covenant.page.scss'],
})
export class CovenantPage implements OnInit {
  public itemList;
  datePickerObj: any = {};
  thisDay = new Date();
  selectedDate;
  showEvent;

  constructor(public modalCtrl: ModalController, private apiCall: DataService, private socialSharing: SocialSharing) {}

  getItems(a){
    let e = a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + a.getDate();
    let params ='cats=3&type=devotion&start='+e;
    this.apiCall.fetchData('get/k2/items/',params,false).subscribe(
        data => {
          this.showEvent = !!(Array.isArray(data['items']) && data['items'].length > 0);
          this.itemList = data['items'];
          console.log(data['items']);
        },
        err => console.error(err),
        () => console.log('get Devotions Completed')
    );

  }

  getDay(str) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(str).getDay()];
  }

  getMonth(str) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[new Date(str).getMonth()];
  }

  getThumb(item) {
    var vid ="";
    switch (item.b) {
      case 1:
        vid = "assets/img/play.png";
        break;
      case 2:
        vid = "assets/img/play.png";
        break;
      default:
        vid = "assets/img/play.png";//item.MediaThumb;
        break;
    }
    return vid;
  }

  playVid(item) {
    var vid ="#";
    switch (item.Type) {
      case 1:
        vid = "http://www.youtube.com/embed/" + item.extra_fields[3].value + "?autoplay=1";
        break;
      case 2:
        vid = "http://www.dailymotion.com/video/" + item.extra_fields[3].value;
        break;
      default:
        vid = item.MediaLocation;
        break;
    }
  }

  doHTML(str) {
    return str.replace(/<(?:.|\n)*?>/gm, '');
  }

  getContent(obj) {
    return obj.toString();
  }

  shareUs(item) {
    let options = {
      message: 'Verse: \n'+item.bible_verse, // not supported on some apps (Facebook, Instagram)
      subject: item.title, // fi. for email
      files: [item.images.imageMedium], // an array of filenames either locally or remotely
      url: 'https://www.winnerschapelny.org',
      chooserTitle: 'WCINY' // Android only, you can override the default share sheet title
    }

    this.socialSharing.shareWithOptions(options).catch((err) => {
      console.log(err);
    });
  }

  async openDatePicker() {
    console.log("Open Date Picker");

    const modalCtrl = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: "li-ionic4-datePicker",
      componentProps: { objConfig: this.datePickerObj }
    });
    await modalCtrl.present();

    modalCtrl.onDidDismiss().then(data => {
      // this.isModalOpen = false;
      console.log(data);
      let newDate = new Date(data.data.date);
      this.selectedDate = newDate.toISOString().substr(0,10);
      this.getItems(newDate);
    });
  }

  ngOnInit() {
    this.selectedDate = this.thisDay.toISOString().substr(0,10);
    console.log(this.selectedDate);
    this.datePickerObj = {
      inputDate: this.thisDay, // If you want to set date in date-picker
      dateFormat: "DD MMM YYYY",
      closeOnSelect: true,
      setLabel: "OK",
      showTodayButton: false, // default true
      titleLabel: this.selectedDate, // default null
      yearInAscending: true
    };
    this.getItems(this.thisDay);
  }

}
