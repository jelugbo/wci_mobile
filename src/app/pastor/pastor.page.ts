import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-pastor',
  templateUrl: './pastor.page.html',
  styleUrls: ['./pastor.page.scss'],
})
export class PastorPage implements OnInit {
  scheduleForm: FormGroup;
  submitAttempt: boolean = false;
  constructor(private formBuilder: FormBuilder, private apiCall: DataService, private toastCtrl: ToastController) { }

  save(){
    this.submitAttempt = true;
    if(!this.scheduleForm.valid){
      console.log("INVALID SCHEDULE FORM!")
    }else {
      console.log(this.scheduleForm.value);
      let postData = this.scheduleForm.value;
      postData.opt = 'pastor';
      // submit form details add addItem(userId)
      this.apiCall.sendData('post/nubia/save', postData, true).subscribe(
          data => {
            console.log(data);
            if(data['status'] === 'ko'){
              this.presentToast('There was a problem with your submission: '+data['error_description'] );
            }else{
              this.presentToast('Schedule Request successfully submitted');
            }
          },
          err => this.presentToast('There was an error with your Schedule request submission: '+err),
          () => console.log("Schedule Request submission Completed")
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
      console.log('Toast Dismissed: '+ val);
    });
  }

  ngOnInit() {
    this.scheduleForm = this.formBuilder.group({
      fname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      comment: ['', Validators.compose([Validators.required])],
      contact_date: ['', Validators.compose([Validators.required])],
      contact_time: ['', Validators.compose([Validators.required])]
    });
  }

}
