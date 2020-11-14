import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {InfoService} from '../services/info.service';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {ModalController, ToastController} from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {

  public notes = [];
  public dates;
  public showNotes;
  // selectedItem : any;
  constructor(private navCtrl: Router, private apiCall: DataService, private sqlite: SQLite,
              private toastCtrl: ToastController, private infoService: InfoService,
              public modalCtrl: ModalController, private socialSharing: SocialSharing) {}

  getNotes(){
  const mth = ('0' + (this.dates.getMonth() + 1)).slice(-2);
  // SELECT strftime('%s','now') SELECT id, date, topic, content FROM notes WHERE strftime('%m',date) > ? ORDER BY id DESC
  console.log(mth);
  this.sqlite.create({
      name: 'wciny.db',
      location: 'default'
    })
        .then((db: SQLiteObject) => {
          db.executeSql('SELECT id, date, topic, content FROM notes WHERE strftime(\'%m\',date) = ? ORDER BY id DESC', [mth])
              .then((data) => {
                this.showNotes = true; // !!(Array.isArray(data.rows) && data.rows.length > 0);
                this.notes = [];
                if (data.rows.length > 0 ){
                  console.log(data.rows);
                  for (let i = 0; i < data.rows.length; i++) {
                    this.notes.push(data.rows.item(i));
                  }
                }
              })
              .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
  }

  shareMe(item) {
    const options = {
      message: 'Note: \n' + item.content,  // not supported on some apps (Facebook, Instagram)
      subject: item.topic, // fi. for email
      files: ['www/assets/img/logo22.png'], // an array of filenames either locally or remotely
      url: 'https://www.winnerschapelny.org',
      chooserTitle: 'WCINY' // Android only, you can override the default share sheet title
    };

    this.socialSharing.shareWithOptions(options).catch((err) => {
      console.log(err);
    });
  }

  async editMe(note){
    console.log(note);
    const modal = await this.modalCtrl.create({
      component: PopoverPage,
      cssClass: 'my-custom-class',
      componentProps: {
        item: note
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.getNotes();
    console.log(data);
  }

  async addNew(){
    const pageModal = await this.modalCtrl.create({
      component: PopoverPage
    });

    await pageModal.present();
    const { data } = await pageModal.onDidDismiss();
    this.getNotes();
    console.log(data);
  }

  onModalDismiss(){
    this.modalCtrl.dismiss({
      dismissed: true
    });
}

  onItemDelete(item) {
    this.sqlite.create({
      name: 'wciny.db',
      location: 'default'
    })
        .then((db: SQLiteObject) => {
          db.executeSql('DELETE FROM notes WHERE id = ?', [item.id])
              .then((data) => {
                console.log(data);
                this.getNotes();
                this.presentToast('Note successfully deleted');
              })
              .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });
    await toast.present();
  }

  goNext() {
    this.notes = [];
    this.dates = new Date(this.dates);
    this.dates.setMonth(this.dates.getMonth() + 1);
    this.getNotes();
    console.log(this.dates);
  }

  goBack() {
    this.notes = [];
    this.dates = new Date(this.dates);
    this.dates.setMonth(this.dates.getMonth() - 1);
    this.getNotes();
  }

  getDay(str){
    const days = ['SUNDAY', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const strDate = (str instanceof Date) ? str : new Date(str);
    return days[strDate.getUTCDay()];
  }

  getMon(str){
    const strDate = (str instanceof Date) ? str : new Date(str);
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
      'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return months[strDate.getMonth()];
  }

  getNum(str){
    const strDate = (str instanceof Date) ? str : new Date(str);
    return strDate.getUTCDate();
  }

  ngOnInit() {
    this.dates = new Date();
    this.getNotes();
  }
}
