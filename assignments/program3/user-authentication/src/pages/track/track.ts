import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import { DataProvider } from '../../providers/data/data';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

declare var google;
 
@Component({
  selector: 'track-page',
  templateUrl: 'track.html'
})
export class TrackPage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  constructor(
    public navCtrl: NavController,
     public geolocation: Geolocation, 
     public locationTracker: LocationTracker,
     //public data:DataProvider,
     
     ) {
      
 
  }
 
  ionViewDidLoad(){
    this.loadMap();
    
  }
  
   loadMap(){
 //loads the map around current position
    this.geolocation.getCurrentPosition().then((position) => {
    //gets the latitude and longitude
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    }, (err) => {
      console.log(err);
    });
 
  }

  start(){
    this.locationTracker.startTracking(); //allows the app to track the user's location
  }
 
  stop(){
    this.locationTracker.stopTracking(); //stops tracking of the user
  }

  addMarker(){
 //adds marker at current position and center the map
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>Information!</h4>";         
   
    this.addInfoWindow(marker, content);
   
  }
//adds marker to window
  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }
 
}