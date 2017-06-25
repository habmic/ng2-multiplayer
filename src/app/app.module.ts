import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';


const config = {
  apiKey: 'AIzaSyChWgkenBfXfcMQpazgqWj7SGqqwildmeI',
  authDomain: 'ng2-multiplayer.firebaseapp.com',
  databaseURL: 'https://ng2-multiplayer.firebaseio.com',
  projectId: 'ng2-multiplayer',
  storageBucket: 'ng2-multiplayer.appspot.com',
  messagingSenderId: '111757897801'
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
