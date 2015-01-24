"use strict";

function GameController(space){
    this.space = space;
}

GameController.prototype.throttle = function(){
    this.space.rocket.throttle();
    this.space.rocket.update();
}

GameController.prototype.rotateLeft = function(){
    this.space.rocket.rotateLeft();
    this.space.rocket.update();
}

GameController.prototype.rotateRight = function(){
    this.space.rocket.rotateRight();
    this.space.rocket.update();
}
