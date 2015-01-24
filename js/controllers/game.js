"use strict";

function GameController(space){
    this.space = space;
}

GameController.prototype.throttle = function(){
    this.space.rocket.throttle();
}

GameController.prototype.rotateLeft = function(){
    console.log("ROT");
    this.space.rocket.rotateLeft();
}

GameController.prototype.rotateRight = function(){
    this.space.rocket.rotateRight();
}

GameController.prototype.update = function(){
    this.space.rocket.update();
};
