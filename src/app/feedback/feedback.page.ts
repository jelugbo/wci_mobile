import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  feedbackForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(private apiCall: DataService, private toastCtrl: ToastController,
              public formBuilder: FormBuilder) {
  }

  save() {
    this.submitAttempt = true;
    if (!this.feedbackForm.valid) {
      console.log("INVALID FEEDBACK FORM!")
    } else {
      console.log(this.feedbackForm.value);
      let postData = this.feedbackForm.value;
      postData.opt = 'feedback';
      /*      this.presentToast('Prayer request successfully submitted');*/
      // submit form details add addItem(userId)
      this.apiCall.sendData('post/nubia/save', postData, true).subscribe(
          data => {
            console.log(data);
            if (data['status'] === 'ko') {
              this.presentToast('There was a problem with your submission: ' + data['error_description']);
            } else {
              this.presentToast('Feedback successfully submitted');
              this.feedbackForm.reset();
            }
          },
          err => this.presentToast('There was an error with your Prayer request submission: ' + err),
          () => console.log("Feedback submission Completed")
      );

    }
  }

  async presentToast(msg) {

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });

    toast.present();
    toast.onDidDismiss().then((val) => {
      console.log('Toast Dismissed');
    });
  }

  ngOnInit() {
    let UserId = 0;//localStorage.getItem("ProfileId");
    this.feedbackForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      lastname: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      email: new FormControl('', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      subject: new FormControl('', Validators.compose([Validators.required])),
      message: new FormControl('', Validators.compose([Validators.required]))
    });
  }
}
