import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {

  joinForm: FormGroup;
  submitAttempt = false;

  constructor(private apiCall: DataService , private toastCtrl: ToastController,
              public formBuilder: FormBuilder) { }

  save(){
    this.submitAttempt = true;
    if (!this.joinForm.valid){
      console.log('INVALID PRAYER FORM!');
    }else {
      console.log(this.joinForm.value);
      const postData = this.joinForm.value;
      postData.opt = 'join';
      /*      this.presentToast('Prayer request successfully submitted');*/
      // submit form details add addItem(userId)
      this.apiCall.sendData('post/nubia/save', postData, true).subscribe(
          data => {
            console.log(data);
            if (data.status === 'ko'){
              this.presentToast('There was a problem with your submission: ' + data.error_description );
            }else{
              this.presentToast('Form successfully submitted');
            }
          },
          err => this.presentToast('There was an error with your Join Team request submission: ' + err),
          () => console.log('Join Request submission Completed')
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
    const UserId = 0; // localStorage.getItem("ProfileId");
    this.joinForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      lastname: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      email: new FormControl('', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.required])),
      phone: new FormControl('', Validators.compose([ Validators.required])),
      department: new FormControl('', Validators.compose([ Validators.required])),
      info: new FormControl('', Validators.compose([Validators.maxLength(200)])),
      approved: new FormControl(UserId, Validators.compose([Validators.maxLength(10)]))
    });
  }


}
