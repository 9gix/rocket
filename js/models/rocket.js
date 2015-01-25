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
    this.thrust = 1.2;
    this.manouvre = 3;
    this.maxSpeed = 5;
    this.width = 25;
    this.height = 25;

    this.x = x;  // rightward is positive
    this.y = y;  // downward is positive
    this.direction = angle || 0;

    this.velocity = {  // in polar velocity form
        speed: 0,
        angle: angle || 0  // in degree, 0 is facing upwards
    };
}

/*************************/
/********** API **********/
/*************************/

Rocket.prototype.throttle = function() {
    var polarAcceleration = {
        speed: this.thrust,
        angle: this.direction
    };
    var axialAcceleration = this.getAxialForm(polarAcceleration);

    var axialVelocity = this.getAxialForm(this.velocity);
    axialVelocity.x += axialAcceleration.x;
    axialVelocity.y += axialAcceleration.y;

    this.velocity = this.getPolarForm(axialVelocity);

    if (this.velocity.speed > this.maxSpeed) {
        this.velocity.speed = this.maxSpeed;
    }
};

Rocket.prototype.rotateLeft = function() {
    this.direction -= this.manouvre;
};

Rocket.prototype.rotateRight = function() {
    this.direction += this.manouvre;
};

Rocket.prototype.update = function() {
    var axialVelocity = this.getAxialForm(this.velocity);

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

Rocket.prototype.getX = function() {
    return this.x;
};

Rocket.prototype.getY = function() {
    return this.y;
};

Rocket.prototype.getAngle = function() {
    return this.direction;
};

// To be called only by models/space.js
Rocket.prototype.accountGravity = function(gravity) {
    var axialVelocity = this.getAxialForm(this.velocity);
    axialVelocity.y += gravity;
    this.velocity = this.getPolarForm(axialVelocity);
    if (this.velocity.speed > this.maxSpeed) {
        this.velocity.speed = this.maxSpeed;
    }
};

// To be called only by models/space.js
Rocket.prototype.accountDrag = function(drag) {
    this.velocity.speed -= drag;
    if (this.velocity.speed < 0) {
        this.velocity.speed = 0;
    }
};

/*************************************/
/********** private methods **********/
/*************************************/

Rocket.prototype.getAxialForm = function(polarVelocity) {
    var result = {};
    result.x = Math.sin(Math.PI/180 * polarVelocity.angle) * polarVelocity.speed;
    // must negate speed because upwards is negative, but 0 degree angle is upwards
    result.y = Math.cos(Math.PI/180 * polarVelocity.angle) * -polarVelocity.speed;
    return result;
};

Rocket.prototype.getPolarForm = function(axialVelocity) {
    var result = {};
    result.speed = this.getPolarMagnitude(axialVelocity.x, axialVelocity.y);
    result.angle = this.getPolarAngle(axialVelocity.x, axialVelocity.y);
    return result;
};

Rocket.prototype.getPolarMagnitude = function(x, y) {
    return Math.sqrt(x * x + y * y);
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
