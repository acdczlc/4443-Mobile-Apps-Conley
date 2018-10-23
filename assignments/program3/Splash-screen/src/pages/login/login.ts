import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TrackPage } from '../track/track';
import { RegisterPage } from '../register/register';
import { AuthService } from '../core/auth.service';
import { UserPage } from '../user/user';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public formBuilder: FormBuilder
  ) {}

  ionViewWillLoad(){
    this.loginForm = this.formBuilder.group({
      email: new FormControl(), //declares new form controls
      password: new FormControl(),
    });
  }

  tryLogin(value){
    this.authService.doLogin(value) //if login is successful take user to user page
    .then(res => {
      //console.log(res);
      this.navCtrl.push(UserPage);
    }, err => { //if error display error
      //console.log(err);
      this.errorMessage = err.message;
    })
  }
  goRegisterPage(){
    
    this.navCtrl.push(RegisterPage); //take user to register page
    console.log("Going to registerpage");
  }

}
