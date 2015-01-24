/**
 * Some parts of this code is adapted from
 * https://github.com/prajogotio/parquer/blob/master/parquer.js
 */
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
    this.inertia;  // or friction/air resistance?
    this.manouvre;
    this.maxSpeed;
    this.gravity;  // define here?

    this.x = x;
    this.y = y;

    this.velocity = {  // in polar velocity form
        speed: 0,
        angle: angle || 0  // in degree, 0 is facing upwards
    };

    this.isThrottling = false;
    this.isRotatingLeft = false;
    this.isRotatingRight = false;
}

/********** API **********/
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
    this.accountInertia();
    this.accountGravity();
    this.accountCommand();
    this.updatePosition();
};

Rocket.prototype.getX = function() {
    return this.x;
};

Rocket.prototype.getY = function() {
    return this.y;
};

/********** private methods **********/
Rocket.prototype.accountInertia = function() {
    this.velocity.speed -= this.inertia;
    if (this.velocity.speed < 0) {
        this.velocity.speed = 0;
    }
};

Rocket.prototype.accountGravity = function() {
};

Rocket.prototype.accountCommand = function() {
    if (this.isThrottling) {
        this.velocity.speed += this.thrust;
    }
    if (this.isRotatingCCW) {
    }
    if (this.isRotatingCW) {

    }
};

Rocket.prototype.updatePosition = function() {
};
