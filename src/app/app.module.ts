import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';


var config = {
  apiKey: "AIzaSyD79Rd2fqqNpZ6G2NGlk2A0wnPjA9c6c4c",
  authDomain: "ng-vikings-a3018.firebaseapp.com",
  databaseURL: "https://ng-vikings-a3018.firebaseio.com",
  projectId: "ng-vikings-a3018",
  storageBucket: "ng-vikings-a3018.appspot.com",
  messagingSenderId: "415216802192"
};

const appRoutes: Routes = [
  { path: 'game', component: GameComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [AngularFireDatabase, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
