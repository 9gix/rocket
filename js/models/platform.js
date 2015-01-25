function BoundingRectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

BoundingRectangle.prototype.collidesWith = function(anotherBRect) {
    return (!(anotherBRect.x + anotherBRect.width/2 < this.x - this.width/2 ||
            anotherBRect.x - anotherBRect.width/2 > this.x + this.width/2) 
        && !(anotherBRect.y + anotherBRect.height/2 < this.y - this.height/2 ||
            anotherBRect.y - anotherBRect.height/2 > this.y + this.height/2) );
};

function Platform(x, y){
    this.x = x;
    this.y = y;
    BoundingRectangle.call(this, x, y, 100, 10);
    this.speedLimit = 4;
}

Platform.prototype = Object.create(BoundingRectangle.prototype);

Platform.prototype.getX = function(){
    return this.x;
};

Platform.prototype.getY = function(){
    return this.y;
};

Platform.prototype.collissionHandler = function(rocket) {
    var rocketBRect = new BoundingRectangle(rocket.x, rocket.y, rocket.width, rocket.height);
    var collided = this.collidesWith(rocketBRect);
    if(collided){
        rocket.velocity.speed = 0;
        if(rocket.velocity.speed > this.speedLimit) {
            rocket.setDead();
        }
    }
};

Platform.prototype.render = function(g) {
    g.save();
    g.translate(this.x, this.y);
    g.fillStyle = "white";
    g.fillRect(-this.width/2, -this.height/2, this.width, this.height);
    g.restore();
};
