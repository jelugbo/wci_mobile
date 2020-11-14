import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-salvation',
  templateUrl: './salvation.page.html',
  styleUrls: ['./salvation.page.scss'],
})
export class SalvationPage implements OnInit {
  salvationForm: FormGroup;
  submitAttempt: boolean = false;
  hideVerify: boolean = false;
  public isPageTwo: boolean = false;
  duration: number = 3000;

  constructor(private  nCtrl:  Router, private toastCtrl: ToastController,
              private apiCall: DataService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.salvationForm = this.formBuilder.group({
      Fname: new FormControl("", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      Lname: new FormControl("", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      Email: new FormControl("",  Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.required])),
      Phone: new FormControl("", Validators.compose([Validators.required])),
      Hear: new FormControl("", Validators.compose([Validators.required])),
      GiveLife: new FormControl("", Validators.compose([Validators.required])),
      Decision: new FormControl("", Validators.compose([Validators.required])),
      ContactOption: new FormControl("", Validators.compose([Validators.required])),
      Message: new FormControl("", Validators.compose([Validators.required]))
    });
  }
  save(){
    this.submitAttempt = true;
    if(!this.salvationForm.valid){
      console.log("INVALID SALVATION FORM!")
    }else {
      console.log(this.salvationForm.value);
      let postData = this.salvationForm.value;
      postData.opt = 'salvation';
      this.apiCall.sendData('post/nubia/save', postData, true).subscribe(
          data => {
            console.log(data);
            if(data['status'] === 'ko'){
              this.presentToast('There was a problem with your submission: '+data['error_description'] );
            }else{
              this.presentToast('Salvation Form successfully submitted');
              this.salvationForm.reset();
            }
          },
          err => this.presentToast('There was an error with your Prayer request submission: '+err),
          () => console.log("Salvation Form submission Completed")
      );

    }
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

}
