import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {InfoService} from "../services/info.service";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(public navCtrl: Router,private infoService: InfoService) { }

  navigate(opt,isURL) {
    let link ="";
    console.log(opt)
    switch (opt) {
      case 'give':
      case 'wsf':
      case 'radio':
        this.infoService.setData(1, opt);
        link = '/give/1';
        break;
      default:
        link='/tab';
        break;
    }
    this.navCtrl.navigateByUrl(link);
   // isURL ? this.cordovaBrowse(link) : this.navCtrl.navigate([link]);

  }

  ngOnInit() {
  }

}
