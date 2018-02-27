/// <reference path="../../../node_modules/phaser/typescript/phaser.d.ts" />

import {Component, OnDestroy} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as uuid from 'uuid';
import * as _ from 'lodash';

declare let Phaser: any;
declare let self: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnDestroy {


  game: any;
  sprite;
  cursors;
  moveFactor;
  maxVelocity = 500;
  enemies;
  myGuid;
  db: AngularFireDatabase;
  self;
  enemiesMap = {};

  constructor(db: AngularFireDatabase) {

    window.onunload = function () {
      self.enemies.remove(self.myGuid);
    };

    window.onbeforeunload = function (e) {
      self.enemies.remove(self.myGuid);
    };

    this.db = db;
    this.game = new Phaser.Game(
      window.innerWidth, window.innerHeight,         // full screen
      Phaser.AUTO,      // Render type
      'gameDiv',    // id of the DOM element to add the game
      {
        preload: function () {

          this.game.load.spritesheet('me', 'assets/animals.png', 32, 32, 96);
          this.game.load.spritesheet('e1', 'assets/animals.png', 32, 32, 96);

        },
        create: this.create,
        update: this.update
      }
    );
    self = this;

  }

  create() {

    self.myGuid = uuid.v4();
    const width = Math.floor((Math.random() * window.innerWidth) + 1);
    const hieght = Math.floor((Math.random() * window.innerHeight) + 1);

    self.enemies = self.db.list('/enemies');


    self.enemies.subscribe(snapshots => {
      snapshots.forEach(snapshot => {

        if (snapshot.key !== self.myGuid) {
          if (!self.enemiesMap[snapshot.key]) {
            this.game.load.spritesheet('e1', 'assets/animals.png', 32, 32, 96);

            const currentEnemy = this.game.add.sprite(snapshot.x, snapshot.y, 'e1');

            currentEnemy.anchor.setTo(0, 0);
            this.game.physics.enable(currentEnemy, Phaser.Physics.ARCADE);

            currentEnemy.animations.add('down', [48, 49, 50], 10, true);
            currentEnemy.animations.add('left', [60, 61, 62], 10, true);
            currentEnemy.animations.add('right', [72, 73, 74], 10, true);
            currentEnemy.animations.add('up', [84, 85, 86], 10, true);

            currentEnemy.animations.play('right', 5, true);

            self.enemiesMap[snapshot.key] = currentEnemy;
          }
        }
      });
    });

    self.enemies.push({key: self.myGuid, x: width, y: hieght});

    this.sprite = this.game.add.sprite(width, hieght, 'me');

    this.sprite.anchor.setTo(0, 0);
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.animations.add('down', [0, 1, 2], 10, true);
    this.sprite.animations.add('left', [12, 13, 14], 10, true);
    this.sprite.animations.add('right', [24, 25, 26], 10, true);
    this.sprite.animations.add('up', [36, 37, 38], 10, true);


    this.sprite.animations.play('right', 5, true);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.moveFactor = 10;

  }

  update() {

    if (this.cursors.left.isDown &&
      (this.sprite.body.x - this.moveFactor >= 0 || this.sprite.body.x + this.sprite.body.velocity.x >= 0 )) {
      this.sprite.animations.play('left', 5, true);
      if (Math.abs(this.sprite.body.velocity.x) <= Math.abs(self.maxVelocity)) {
        this.sprite.body.velocity.x -= this.moveFactor;
      }
    } else if (this.cursors.right.isDown &&
      (this.sprite.body.x + this.moveFactor + 32 <= window.innerWidth || this.sprite.body.x + this.sprite.body.velocity.x + 32 <= window.innerWidth)) {
      this.sprite.animations.play('right', 5, true);
      if (Math.abs(this.sprite.body.velocity.x) <= Math.abs(self.maxVelocity)) {
        this.sprite.body.velocity.x += this.moveFactor;
      }
    } else if (this.cursors.up.isDown &&
      (this.sprite.body.y - this.moveFactor >= 0 || this.sprite.body.y + this.sprite.body.velocity.y >= 0)) {
      this.sprite.animations.play('up', 5, true);
      if (Math.abs(this.sprite.body.velocity.y) <= Math.abs(self.maxVelocity)) {
        this.sprite.body.velocity.y -= this.moveFactor;
      }
    } else if (this.cursors.down.isDown &&
      (this.sprite.body.y + this.moveFactor + 32 <= window.innerHeight || this.sprite.body.y + this.sprite.body.velocity.y + 32 <= window.innerHeight)) {
      this.sprite.animations.play('down', 5, true);
      if (Math.abs(this.sprite.body.velocity.y) <= Math.abs(self.maxVelocity)) {
        this.sprite.body.velocity.y += this.moveFactor;
      }
    } else {
      this.sprite.body.velocity.y = 0;
      this.sprite.body.velocity.x = 0;
    }

    self.enemies.subscribe(snapshots => {
      snapshots.forEach(snapshot => {

        if (snapshot.key !== self.myGuid) {
          if (self.enemiesMap[snapshot.key]) {
            // self.enemiesMap[snapshot.key].body.x = snapshot.x;
            // self.enemiesMap[snapshot.key].body.y = snapshot.y;
          }
        }
      })
    });

    let didCollide = false;
    _.forEach(self.enemiesMap, (e, key) => {
      if (self.game.physics.arcade.collide(this.sprite, e)) {
        didCollide = true;
      }
    });


    if (!didCollide) {
      self.enemies.update(self.myGuid, {x: this.sprite.body.x, y: this.sprite.body.y});
    }


    this.sprite.play('ex', 50, false, true);
  }

  ngOnDestroy() {
    this.enemies.remove(this.myGuid);
  }

}
