import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {  Geoposition } from '@ionic-native/geolocation';
import { LocationTracker } from '../location-tracker/location-tracker';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DataProvider {
  

  constructor(private firestore: AngularFirestore) {
    console.log('Hello DataProvider Provider');
  }
  
  //adding a document in firebase or send error that is logged
  async sendLocation(x: Geoposition) {
    var Ref = this.firestore.collection<any>('locations');
    console.log("inside sendlocation");
    try {
      console.log("inside sendlocation try");
      await Ref.add({
        id: 100,
        lat:x.coords.latitude,
        long:x.coords.longitude,
        time:x.timestamp
      });
    } catch(e) {
      console.log(e);
      throw e;
    }
  }
}
