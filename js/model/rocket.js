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

    this.angle = angle || 0;  // in degree, 0 is facing (?) TODO(digawp)

    this.x = x;
    this.y = y;

    this.velocity = {
        speed: 0,
        alpha: angle  // angle or 0?
    };

    this.isThrottling = false;
    this.isRotatingCCW = false;
    this.isRotatingCW = false;
}

/********** API **********/
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
    this.accountInertia();
    this.accountGravity();
    this.accountCommand();
    this.updatePosition();
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
