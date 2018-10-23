import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import {  Geoposition } from '@ionic-native/geolocation';
import { LocationTracker } from '../location-tracker/location-tracker';
import { UserService } from '../../pages/core/user.service';
import {FirebaseUserModel}from '../../pages/core/user.model';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class DataProvider {
  
  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(private firestore: AngularFirestore, public userService: UserService,) {
    console.log('Hello DataProvider Provider');
    this.userService.getCurrentUser()//sets user to current user
    .then(user => {
      this.user = user;
    }, err => console.log(err))

    console.log(this.user);
   
    
  }
  
  //adding a document in firebase or send error that is logged
  async sendLocation(x: Geoposition) {
    var Ref = this.firestore.collection<any>('locations');
    console.log("inside sendlocation");
    try {
      console.log("inside sendlocation try"); //variables that are sent to firebase
      await Ref.add({
        id: this.user.id,
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
