import { Component, OnInit } from '@angular/core';
// import { NavController} from 'ionic-angular';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { InAppBrowser , InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage';
import {InfoService} from '../services/info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    public itemSlide = [
        {
            pix: 'slider.png'
        }
        // },
        // {
        //     pix: "slide2.png"
        // }
        ];

  constructor(private apiCall: DataService, private appBrowser: InAppBrowser, public navCtrl: Router,
              private storage: Storage, private sqlite: SQLite, private infoService: InfoService, private push: FCM) {}
    options: InAppBrowserOptions = {
        location : 'no', // Or 'no'
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
    public systemBrowse(url: string){
        const target = '_system';
        this.appBrowser.create(url, target, this.options);
    }
    public appBrowse(url: string){
        const target = '_blank';
        this.appBrowser.create(url, target, this.options);
    }
    public cordovaBrowse(url: string){
        const target = '_self';
        this.appBrowser.create(url, target, {location: 'no'});
    }

    navigate(opt, isURL) {
        let link = '';
        console.log(opt);
        switch (opt) {
            case 'event':
                link = '/events';
                break;
            case 'connect':
                link = '/socials';
                break;
            case 'contacts':
                link = '/contacts';
                break;
            case 'covenant':
                link = '/covenant';
                break;
            case 'below':
                link = '/join';
                break;
            case 'give':
            case 'radio':
                this.infoService.setData(2, opt);
                link = '/give/2';
                break;
            case 'wsf':
                link = '/wsf';
                break;
            case 'live':
                link = '/live';
                break;
            case 'salvation':
                link = '/salvation';
                break;
            case 'new':
                link = '/new';
                break;
            default:
                link = '/home';
                break;
        }
        isURL ? this.systemBrowse(link) : this.navCtrl.navigate([link]);

    }

    createDbs(){
        this.sqlite.create({
            name: 'wciny.db',
            location: 'default'
        })
            .then((db: SQLiteObject) => {
                db.executeSql('CREATE TABLE IF NOT EXISTS messages (id integer primary key, date text, title text, message text)', [])
                    .then(() => console.log('Executed SQL'))
                    .catch(e => console.log(e));
                db.executeSql('CREATE TABLE IF NOT EXISTS notes (id integer primary key, date text, topic text, content text)', [])
                    .then(() => console.log('Executed SQL'))
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    }

    setPushThings(){
        const params = 'opt=notifications';
        this.apiCall.fetchData('get/nubia/pull/', params, false).subscribe(
            data => {
                // console.log(data['data']);
                /*Start*/
                const upData = data['data'];
                const env = this;
                if (upData.length > 0) { /*Do we have Push settings from server?*/
                    this.storage.get('pushSettings')
                        .then( (dat) => {
                            // console.log(upData);
                            const downData = (dat === null) ? [] : JSON.parse(dat);
                            /*Update Push settings*/
                            Object.keys(upData).forEach((k) => {
                                const pik  = downData.filter((o) => o[upData[k].id])[0];
                                // console.log(pik);
                                if (env.push.hasPermission() && upData[k].Enabled){ // Subscribe to Topic
                                    env.push.subscribeToTopic((upData[k].Group_Name).replace(/\s/g, '-'));
                                }
                                if (typeof pik !== 'undefined') {
                                    if (pik[upData[k].id].Group_Name !== upData[k].Group_Name){
                                        pik[upData[k].id].Group_Name = upData[k].Group_Name;
                                        // downData.push({[[upData[k]['id']]['Group_Name']] : upData[k]['Group_Name']});
                                        // /downData[upData[k]['id']]['Group_Name'] = upData[k]['Group_Name'];
                                    }
                                } else {
                                    // downData[upData[k]['id']] = upData[k];
                                    downData.push({[upData[k].id] : upData[k]});
                                }
                            });
                            env.storage.set('pushSettings', JSON.stringify(downData));
                        }, (error) => {
                            console.log('No Push Settings Stored ' + error);
                        });

                }
            },
            err => console.error(err),
            () => console.log('Fetch Notifications Completed')
        );
    }

    ngOnInit() {
  }

  ionViewDidEnter(){
        /*Get Notification Data and Subscribe to topics here*/
      console.log('Now we Did Enter');
      this.createDbs();
      this.setPushThings();
  }
}
