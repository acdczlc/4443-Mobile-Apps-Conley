import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../core/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';





@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
   public firestore: AngularFirestore,
  ) {}

  
  ionViewWillLoad(){
    this.registerForm = this.formBuilder.group({
     firstname:new FormControl(),//creates form controls on load
     lastname: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
  }
  createUser(
    firstname:any, //variables for form
    lastname:any,
    email: any,
    id:any
  ): Promise<void> {
    //const id = this.firestore.createId();
    console.log(id); //adds new user to firebase
    return this.firestore.doc(`users/${id}`).set({
      id,
      firstname,
      lastname,
      email
    });
  }
  tryRegister(value){
    this.authService.doRegister(value) //attempts to create account
     .then(res => {
       this.errorMessage = "";
       console.log(value);
       console.log(res);
       this.createUser(value.firstname,value.lastname,value.email,res.user.uid);
       this.successMessage = "Your account has been created. Please log in now.";
     }, err => { //if account is not created
       console.log(err.message);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
  }
  goLoginPage(){ //takes user to login page
    this.navCtrl.pop();
  }

}
