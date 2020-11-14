import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Storage} from "@ionic/storage";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  itemList
  profile
  constructor(private storage: Storage, private push: FCM, private apiCall: DataService) { }

  getItems(){
    let env = this;
    this.storage.get('pushSettings')
        .then( function (data) {
          console.log(data);
          env.itemList = JSON.parse(data);//).filter( x => typeof x === 'object');/
         // env.itemList = this.parseAddKey(JSON.parse(data));
          console.log(env.itemList);
        });
  }
  parseAddKey(item){
    //Object.keys(item).
    //return item[Object.keys(item)[0]];

  }

  save() {
    /*this.nativeStorage.setItem('profile', JSON.stringify(this.items));*/
    this.storage.set('profile', JSON.stringify(this.profile));
  }

  addItem(idKey,val) {
    if (this.profile.length > 0){
      let obj = this.profile.filter(function (o) { return o[idKey] })[0];
      console.log(obj);
      if(typeof obj !== 'undefined'){
        if (obj[idKey] !== val && idKey !== 'pushSettings') this.profile.push({[idKey] : val});
      }else{
        this.profile.push({[idKey] : val});
      }
    }else{
      this.profile.push({[idKey] : val});
    }
    console.log(this.profile);
    this.save();
  }

  getValue(item,t){
    //console.log(item[Object.keys(item)[0]][t])
    return item[Object.keys(item)[0]][t];
  }

  onToggleChange(i,s){
    Object.values(this.itemList).forEach((v)=>{
      let dKey = Object.keys(v)[0]
     let dVal = v[dKey]
      if (dVal.id === Object.keys(i)[0]) {
        dVal.Enabled = s.checked
        this.storage.set('pushSettings', JSON.stringify(this.itemList)).then(()=>{
          console.log(dVal.Group_Name);
          (s.checked) ? this.push.subscribeToTopic(dVal.Group_Name.replace(/\s/g, "-")) : this.push.unsubscribeFromTopic(dVal.Group_Name.replace(/\s/g, "-"));
        });
      }
    })
  }

  ngOnInit() {
  this.getItems()
  }

}
