import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import{ TrackPage }from '../pages/track/track';
import { UserPage} from '../pages/user/user';

import { AuthService } from '../pages/core/auth.service';
import { UserService } from '../pages/core/user.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environment/environment';

import { DataProvider } from '../providers/data/data';
import { LocationTracker } from '../providers/location-tracker/location-tracker';
import {Geolocation} from '@ionic-native/geolocation';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseUserModel } from '../pages/core/user.model';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    TrackPage,
    UserPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    TrackPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    LocationTracker,
    Geolocation,
    FirebaseUserModel
  ]
})
export class AppModule {}
