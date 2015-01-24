'use strict';


/**
 * Rocket constructor
 * @param x x-coordinate of rocket
 * @param y y-coordinate of rocket
 */
function Rocket(x, y) {
	this.velocity = 0;
	this.acceleration = 0;

	this.direction = 0;

	this._x = x;
	this._y = y;

	this.isThrottling = false;
	this.isRotatingLeft = false;
	this.isRotatingRight = false;
}

Rocket.prototype.throttle = function() {
	this.isThrottling = true;
};

Rocket.prototype.stopThrottle = function() {
	this.isThrottling = false;
};

Rocket.prototype.rotateLeft = function() {
	this.isRotatingLeft = true;
};

Rocket.prototype.stopRotateLeft = function() {
	this.isRotatingLeft = false;
};

Rocket.prototype.rotateRight = function() {
	this.isRotatingRight = true;
};

Rocket.prototype.stopRotateRight = function() {
	this.isRotatingRight = false;
};

Rocket.prototype.update = function() {
	if (this.isThrottling) {

	}
	if (this.isRotatingLeft) {

	}
	if (this.isRotatingRight) {

	}
};
