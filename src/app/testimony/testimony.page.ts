import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.page.html',
  styleUrls: ['./testimony.page.scss'],
})
export class TestimonyPage implements OnInit {

  testimonyForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(private apiCall: DataService , private toastCtrl: ToastController,
              public formBuilder: FormBuilder) { }

  save(){
    this.submitAttempt = true;
    if(!this.testimonyForm.valid){
      console.log("INVALID TESTIMONY FORM!")
    }else {
      //console.log(this.testimonyForm.value);
      let postData = this.testimonyForm.value;
      postData.opt = 'testimonials';
      postData.approved = 1;
    /*  this.presentToast('Testimony successfully submitted');*/
      // submit form details add addItem(userId)
      this.apiCall.sendData('post/nubia/save', postData, true).subscribe(
          data => {
            console.log(data);
            if(data['status'] === 'ko'){
              this.presentToast('There was a problem with your submission: '+data['error_description'] );
            }else{
              this.presentToast('Testimony successfully submitted');
            }

          },
          err => {console.warn(err);this.presentToast('There was an error with your Testimony submission: '+err.message)},
          () => console.log("Testimony submission Completed")
      );

    }
  }

  async presentToast(msg) {

    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'middle'
    });

    toast.present();
    toast.onDidDismiss().then((val) => {
      console.log('Toast Dismissed');
    });
  }

  ngOnInit() {
    let UserId = 0;//localStorage.getItem("ProfileId");
    this.testimonyForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      lastname: new FormControl('', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      email: new FormControl('', Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.required])),
      phone: new FormControl('', Validators.compose([ Validators.required])),
      testimony: new FormControl('', Validators.compose([Validators.required])),
      approved: new FormControl(UserId, Validators.compose([Validators.maxLength(10)]))
    });
  }

}
