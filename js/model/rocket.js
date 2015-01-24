'use strict';

/**
 * Rocket constructor
 * @param x x-coordinate of rocket
 * @param y y-coordinate of rocket
 * @param angle the angle in which the rocket is facing, defaults to 0
 */
function Rocket(x, y, angle) {
	// constants
	this.thrust;
	this.inertia;
	this.manouvre;
	this.maxSpeed;

	this.angle = angle || 0;

	this.x = x;
	this.y = y;

	this.x_velocity = 0;
	this.y_velocity = 0;

	this.x_acceleration = 0;
	this.y_acceleration = 0;

	this.isThrottling = false;
	this.isRotatingCCW = false;
	this.isRotatingCW = false;
}

Rocket.prototype.throttle = function() {
	this.isThrottling = true;
};

Rocket.prototype.stopThrottle = function() {
	this.isThrottling = false;
};

Rocket.prototype.rotateCCW = function() {
	this.isRotatingCCW = true;
};

Rocket.prototype.stopRotateCCW = function() {
	this.isRotatingCCW = false;
};

Rocket.prototype.rotateCW = function() {
	this.isRotatingCW = true;
};

Rocket.prototype.stopRotateCW = function() {
	this.isRotatingCW = false;
};

Rocket.prototype.update = function() {
	if (this.isThrottling) {

	}
	if (this.isRotatingCCW) {

	}
	if (this.isRotatingCW) {

	}
};
