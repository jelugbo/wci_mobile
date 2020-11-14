import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var google;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address = '310 Fulton Avenue, Hempstead NY, 11550';

  latitude: string;
  longitude: string;
  constructor(private nativeGeocoder: NativeGeocoder,private launchNavigator: LaunchNavigator) { }

  navToChurch(){
      this.launchNavigator.navigate("310 Fulton Avenue, Hempstead NY, 11550");
  }

  ngOnInit() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.forwardGeocode('310 Fulton Avenue, Hempstead NY, 11550', options)
        .then((result: NativeGeocoderResult[]) => {
          console.log(result[0]);
          console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude)
          this.latitude = result[0].latitude ;
          this.longitude = result[0].longitude;

          let latLng = new google.maps.LatLng(result[0].latitude , result[0].longitude);
          let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }

          // this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

          this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            // this.map.addListener(marker, 'click', function() {
            //     infowindow.open(map,marker);
            // });
            //
            // infowindow.open(map,marker);

          this.map.addListener('dragend', () => {

            this.latitude = this.map.center.lat();
            this.longitude = this.map.center.lng();

            // this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
          });

        })
        .catch((error: any) => console.log(error));
  }

}
