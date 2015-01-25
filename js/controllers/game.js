"use strict";

function GameController(space){
    this.space = space;
}

GameController.prototype.throttle = function(){
    this.space.rocket.throttle();
}

GameController.prototype.rotateLeft = function(){
    this.space.rocket.rotateLeft();
}

GameController.prototype.rotateRight = function(){
    this.space.rocket.rotateRight();
}

GameController.prototype.update = function(){
	for (var i=0;i<this.space.sprites.length;++i) {
		this.space.sprites[i].update();
	}
    this.space.update();
	this.space.collisionCheck();
};

GameController.prototype.prepareSpace = function() {

}


GameController.prototype.levelCompleted = function (){

}