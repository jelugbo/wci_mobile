import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {DataService} from "../services/data.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-wincare',
  templateUrl: './wincare.page.html',
  styleUrls: ['./wincare.page.scss'],
})
export class WincarePage implements OnInit {
  wincareForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(private  nCtrl:  Router, private toastCtrl: ToastController,
              private apiCall: DataService, public formBuilder: FormBuilder) { }

  save(){
    this.submitAttempt = true;
    if(!this.wincareForm.valid){
      console.log("INVALID WINCARE FORM!")
    }else {
      console.log(this.wincareForm.value);
      let postData = this.wincareForm.value;
      postData.Situation = postData.Situation.join("|");
      postData.opt = 'wincare';
      console.log(postData);
      /*      this.presentToast('Prayer request successfully submitted');*/
      // submit form details add addItem(userId)
            this.apiCall.sendData('post/nubia/save', postData, true).subscribe(
                data => {
                  console.log(data);
                  if(data['status'] === 'ko'){
                    this.presentToast('There was a problem with your submission: '+data['error_description'] );
                  }else{
                    this.presentToast('Winners Care Program Form successfully submitted');
                    this.wincareForm.reset();
                  }
                },
                err => this.presentToast('There was an error with your Winners Care Program submission: '+err),
                () => console.log("Winners Care Program submission Completed")
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

  ngOnInit() {
    this.wincareForm = this.formBuilder.group({
      Fname: new FormControl("", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      Lname: new FormControl("", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      Email: new FormControl("",  Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.required])),
      Phone: new FormControl("", Validators.compose([Validators.required])),
      Address: new FormControl("", Validators.compose([ Validators.required, Validators.maxLength(300)])),
      City: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(30)])),
      State: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(100)])),
      Zip: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(10)])),
      Country: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(100)])),
      Gender: new FormControl("", Validators.compose([Validators.required])),
      Member: new FormControl("", Validators.compose([Validators.required])),
      Situation: new FormControl("", Validators.compose([Validators.required]))
    });
  }

}
