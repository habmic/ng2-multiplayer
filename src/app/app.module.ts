import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';


var config = {
  apiKey: "AIzaSyD79Rd2fqqNpZ6G2NGlk2A0wnPjA9c6c4c",
  authDomain: "ng-vikings-a3018.firebaseapp.com",
  databaseURL: "https://ng-vikings-a3018.firebaseio.com",
  projectId: "ng-vikings-a3018",
  storageBucket: "ng-vikings-a3018.appspot.com",
  messagingSenderId: "415216802192"
};

@NgModule({
  declarations: [
    AppComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
