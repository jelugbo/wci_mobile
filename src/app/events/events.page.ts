import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import {InfoService} from '../services/info.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  public eventList;
  public dates;
  public showEvent = true;
  // selectedItem : any;
  constructor(private navCtrl: Router, private apiCall: DataService, private infoService: InfoService) {}

  getEvents(a){
    //let ld = new Date(a.getFullYear(), a.getMonth() + 1, 0);
    //let s = a.getFullYear() + '-' + (a.getMonth() + 1) + '-1';
    let e = a.getFullYear() + '-' + (a.getMonth() + 1) + '-' + a.getDate();
    let params ='cats=2&type=event&start='+e;
    this.apiCall.fetchData('get/k2/items/',params,false).subscribe(
        data => {
          this.showEvent = !!(Array.isArray(data['items']) && data['items'].length > 0);
          console.log(this.showEvent);
          this.eventList = data['items'];//this.normalize(data['items']);
          console.log(data['items']);
        },
        err => console.error(err),
        () => console.log('Fetch Ministries Completed')
    );

  }

goNext() {
  this.eventList = [];
  let CurrentDate = new Date(this.dates);
  CurrentDate.setMonth(CurrentDate.getMonth() + 1);
  this.dates = CurrentDate;
  this.getEvents(CurrentDate);
  console.log(CurrentDate);
}

goBack() {
  this.eventList = [];
  let CurrentDate = new Date(this.dates);
  CurrentDate.setMonth(CurrentDate.getMonth() - 1);
  this.dates = CurrentDate;
  this.getEvents(CurrentDate);
}

doHTML(str){
  return str.replace(/<(?:.|\n)*?>/gm, '');
}

doDate (d, t){
    console.log(d);
  let str = d.slice(0,10)+' '+t;
  return new Date(str.split("-").join("/"));
}

getDay(str){
  let days = ['SUNDAY', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  let strDate = (str instanceof Date)? str : new Date(str);
  return days[strDate.getDay()];
}

getMon(str){
  let strDate = (str instanceof Date)? str : new Date(str);
  let months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  return months[strDate.getMonth()];
}


getNum(str){
  let strDate = (str instanceof Date)? str : new Date(str);
  return strDate.getDate();
}

itemTapped(item){
  this.infoService.setData(item.id, item);
  this.navCtrl.navigateByUrl('/event/'+item.id);
}

  ngOnInit() {
    this.dates = new Date();
    this.getEvents(new Date());
  }
}
