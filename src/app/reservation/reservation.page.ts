import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  reserveForm: FormGroup;
  public hideMe: boolean = true;
  items = [];
  submitAttempt: boolean = false;

  constructor(private  nCtrl:  Router, private toastCtrl: ToastController,private storage: Storage,
              private apiCall: DataService, public formBuilder: FormBuilder, public navParams: ActivatedRoute) { }

   goLive(){
     this.nCtrl.navigate(['/live']);
   }

  save(){
    this.submitAttempt = true;
    if(!this.reserveForm.valid){
      console.log("INVALID Service Reservation FORM!")
    }else {
      console.log(this.reserveForm.value);
      let postData = this.reserveForm.value;
      postData.opt = 'reserve';
      this.apiCall.sendData('post/nubia/save', postData, true).subscribe(
          data => {
            console.log(data);
            if(data['status'] === 'ko'){
              this.presentToast('There was a problem with your submission: '+data['error_description'] );
            }else{
              this.presentToast('Service Reservation Form successfully submitted');
              this.reserveForm.reset();
            }
          },
          err => this.presentToast('There was an error with your Prayer request submission: '+err),
          () => console.log("Service Reservation Form submission Completed")
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
    this.reserveForm = this.formBuilder.group({
      Fname: new FormControl("", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      Lname: new FormControl("", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
      Email: new FormControl("",  Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.required])),
      Phone: new FormControl("", Validators.compose([Validators.required])),
      Service: new FormControl("", Validators.compose([Validators.required])),
      Comments: new FormControl("", Validators.compose([Validators.required]))
    });
  }

}
