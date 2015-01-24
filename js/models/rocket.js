/**
 * Some parts of this code is adapted from
 * https://github.com/prajogotio/parquer/blob/master/parquer.js
 * 
 * TODO(digawp):
 * - make inertia proportional to velocity? (thus max speed no need to be hard-coded)
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

    this.x = x;  // rightward is positive
    this.y = y;  // downward is positive

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
    var axialVelocity = this.getAxialVelocity(this.velocity);
    axialVelocity.y += this.gravity;
    this.velocity = this.getPolarVelocity(axialVelocity);
};

Rocket.prototype.accountCommand = function() {
    if (this.isThrottling) {
        this.velocity.speed += this.thrust;
    }
    if (this.isRotatingLeft) {
        this.angle -= this.manouvre;
    }
    if (this.isRotatingRight) {
        this.angle += this.manouvre;
    }
};

Rocket.prototype.updatePosition = function() {
    var axialVelocity = this.getAxialVelocity(this.velocity);

    this.x += axialVelocity.x;
    if (this.x < 0) {
        this.x = 0;
    }
    // check the other edge as well

    this.y += axialVelocity.y;
    if (this.y < 0) {
        this.y = 0;
    }
    // check the other edge as well
};

Rocket.prototype.getAxialVelocity = function(polarVelocity) {
    var result = {};
    result.x = Math.sin(Math.PI/180 * polarVelocity.angle) * polarVelocity.speed;
    // TODO(digawp): why need negative in parquer?
    result.y = Math.cos(Math.PI/180 * polarVelocity.angle) * polarVelocity.speed;
    return result;
};

Rocket.prototype.getPolarVelocity = function(axialVelocity) {
    var result = {};
    result.speed = this.getPolarSpeed(axialVelocity.x, axialVelocity.y);
    result.angle = this.getPolarAngle(axialVelocity.x, axialVelocity.y);
    return result;
};

Rocket.prototype.getPolarSpeed = function(x, y) {
    return Math.sqrt(axialVelocity.x * axialVelocity.x +
        axialVelocity.y * axialVelocity.y);
};

Rocket.prototype.getPolarAngle = function(x, y) {
    var result;
    if (y === 0) {
        result = 90;
    } else {
        var angleInRadian = Math.atan(Math.abs(x)/Math.abs(y));
        result = angleInRadian / Math.PI * 180;  // convert to degree
    }

    if (x < 0 && y < 0) {  // facing top-left
        result = 360 - result;
    } else if (x < 0) {  // facing bottom-left
        result = 180 + result;
    } else if (y > 0) {  // facing bottom-right
        result = 180 - result;
    }  // else do nothing (facing top-right)
    return result;
};
