"use strict";

function GameController(space){
    this.space = space;
}

GameController.prototype.throttle = function(){
    space.rocket.throttle();
}

GameController.prototype.rotateLeft = function(){
    space.rocket.rotateLeft();
}

GameController.prototype.rotateRight = function(){
    space.rocket.rotateRight();

}
