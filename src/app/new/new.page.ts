import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, NavigationExtras, Router} from "@angular/router";
import { ToastController} from "@ionic/angular";
import { DataService } from "../services/data.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Storage} from "@ionic/storage";

//import { Device } from '@ionic-native/device';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
 @ViewChild('profileSlider') profileSlider: any;

  newForm: FormGroup;
  public hideMe: boolean = true;
  items = [];
  submitAttempt: boolean = false;

  constructor(private  nCtrl:  Router, private toastCtrl: ToastController,private storage: Storage,
              private apiCall: DataService, public formBuilder: FormBuilder, public navParams: ActivatedRoute) { }

    save(){
        this.submitAttempt = true;
        if(!this.newForm.valid){
            console.log("INVALID FIRST TIMER FORM!")
        }else {
            console.log(this.newForm.value);
            let postData = this.newForm.value;
            postData.opt = 'firsttimer';
            this.apiCall.sendData('post/nubia/save', postData, true).subscribe(
                data => {
                    console.log(data);
                    if(data['status'] === 'ko'){
                        this.presentToast('There was a problem with your submission: '+data['error_description'] );
                    }else{
                        this.presentToast('First Timer Form successfully submitted');
                        this.newForm.reset();
                    }
                },
                err => this.presentToast('There was an error with your Prayer request submission: '+err),
                () => console.log("First Timer Form submission Completed")
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
        this.newForm = this.formBuilder.group({
            Fname: new FormControl("", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
            Lname: new FormControl("", Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])),
            Email: new FormControl("",  Validators.compose([Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),Validators.required])),
            Phone: new FormControl("", Validators.compose([Validators.required])),
            Hear: new FormControl("", Validators.compose([Validators.required])),
            GiveLife: new FormControl("", Validators.compose([Validators.required])),
            ContactOption: new FormControl("", Validators.compose([Validators.required])),
            Message: new FormControl("", Validators.compose([Validators.required]))
        });
    }

}
