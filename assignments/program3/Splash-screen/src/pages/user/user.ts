import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { FirebaseUserModel } from '../core/user.model';
import { TrackPage } from '../track/track';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage{

  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    public authService: AuthService
  ) {}

  ionViewWillLoad(){
    this.userService.getCurrentUser()//gets the user who is signed in
    .then(user => {
      this.user = user; //if user is found sets user to one that is logged in
    }, err => console.log(err))
  }


  logout(){ //allows the user to logout
    this.authService.doLogout()
    .then((res) => {
      this.navCtrl.pop(); //gets rid of current page
    }, (error) => {
      console.log("Logout error", error); 
    });
  }

  tracking(){
    this.navCtrl.push(TrackPage); //takes the user to the tracking page
    console.log("trackingpage");
  }
}
