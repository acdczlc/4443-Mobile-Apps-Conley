import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {filter} from 'rxjs/operators';
import { DataProvider } from '../data/data';
 
@Injectable()
export class LocationTracker {
 
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  public time:number=0;
  public id:number;
 
  constructor(public zone: NgZone,public geolocation: Geolocation,public data:DataProvider) {
 
  }
 
  startTracking() {

    // Foreground Tracking
   
  let options = {
    frequency: 200,
    enableHighAccuracy: true
  };
   
  this.watch = 
    this.geolocation.watchPosition(options).pipe(filter((p: any) => p.code === undefined)).subscribe((position: Geoposition) => {
    console.log(position);
    this.data.sendLocation(position).then(()=>{console.log("sending document")}).catch((p:any)=>console.log("error is "+p));
    
    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.id=100;
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.time=position.timestamp;
    });
   
  });

 

//   var timer = setInterval(function(){
//     this.geolocation.getCurrentPosition(options).then(function () { /* Not  used */
//    },
//    function (err) {

//    }, function (position) {
//      this.lat  = position.coords.latitude;
//      this.lng = position.coords.longitude;
     
//      console.log(position);
     

//    });
// }, 1000);
   
  }
 
  stopTracking() {
 
    console.log('stopTracking');
    this.zone.run(() => {
      this.lat = 0;
      this.lng = 0;
    });
    this.watch.unsubscribe();
   
  }
 
}