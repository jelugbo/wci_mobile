import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-wofbi',
  templateUrl: './wofbi.page.html',
  styleUrls: ['./wofbi.page.scss'],
})
export class WofbiPage implements OnInit {
  wofbiForm: FormGroup;
  submitAttempt: boolean = false;
  hideVerify: boolean = false;
  public isPageTwo: boolean = false;
  showArrow: boolean = true;
  duration: number = 5000;
  tEvent: any = 'click';
  constructor(private  nCtrl:  Router, private toastCtrl: ToastController,
              private apiCall: DataService, public formBuilder: FormBuilder) { }

  save(){
    this.submitAttempt = true;
    if(!this.wofbiForm.valid){
      console.log("INVALID WOFBI FORM!")
    }else {
      console.log(this.wofbiForm.value);
      let postData = this.wofbiForm.value;
      postData.opt = 'wofbi';
      /*      this.presentToast('Prayer request successfully submitted');*/
      // submit form details add addItem(userId)
      this.apiCall.sendData('post/nubia/save', postData, true).subscribe(
          data => {
            console.log(data);
            if(data['status'] === 'ko'){
              this.presentToast('There was a problem with your submission: '+data['error_description'] );
            }else{
              this.presentToast('WOFBI Form successfully submitted');
              this.wofbiForm.reset();
            }
          },
          err => this.presentToast('There was an error with your Prayer request submission: '+err),
          () => console.log("WOFBI Form submission Completed")
      );

    }
  }
  prev(){
    this.isPageTwo = false;
  }

  next() {
    console.log("Going on Next");
    this.isPageTwo = true;
/*    if (!this.wofbiForm.valid) {//
      console.log(this.wofbiForm)
      console.log("INVALID first FORM!")
      this.presentToast('Invalid entries, Please fill all required Information');
    } else {
      console.log("Going on Next");
      this.isPageTwo = true;
    }*/
  }

  async presentToast(msg) {

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });

    await toast.present();
    toast.onDidDismiss().then((val) => {
      console.log('Toast Dismissed '+ val);
    });
  }

  ngOnInit() {
    this.wofbiForm = this.formBuilder.group({
      Fname: new FormControl("", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      Lname: new FormControl("", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      Email: new FormControl("",  Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.required])),
      Phone: new FormControl("", Validators.compose([Validators.required])),
      Course: new FormControl("", Validators.compose([Validators.required])),
      Comments: new FormControl("", Validators.compose([Validators.required])),
      PastCollege: new FormControl("", Validators.compose([Validators.required])),
      Terms: new FormControl(false, Validators.compose([Validators.requiredTrue]))
    });
  }

}
