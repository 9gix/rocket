function Space(rocket){
    this.sprites = [];
    this.rocket = rocket;
    this.gravity = 0.01;
    this.drag = 0.0010;
}

Space.prototype.setSprites = function(arrayOfSprites) {
    this.sprites = arrayOfSprites;
}

Space.prototype.insertSprite = function(sprite) {
    this.sprites.push(sprite);
}

Space.prototype.update = function() {
    this.rocket.accountGravity(this.gravity);
    this.rocket.accountDrag(this.drag);
    this.rocket.update();
};

Space.prototype.collisionCheck = function() {
    for (var i = 0; i < this.sprites.length; ++i) {
        this.sprites[i].collissionHandler(this.rocket);
    }
}

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
}

function Platform(x, y) {
    BoundingRectangle.call(this, x, y, 100, 10);
    this.speedLimit = 4;
}

Platform.prototype = Object.create(BoundingRectangle.prototype);

Platform.prototype.collissionHandler = function(rocket) {
    var rocketBRect = new BoundingRectangle(rocket.x, rocket.y, rocket.width, rocket.height);
    var collided = this.collidesWith(rocketBRect);
    if(collided){
        rocket.velocity.speed = 0;
        if(rocket.velocity.speed > this.speedLimit) {
            rocket.setDead();
        }
    }
}

Platform.prototype.render = function(g) {
    g.save();
    g.translate(this.x, this.y);
    g.fillStyle = "white";
    g.fillRect(-this.width/2, -this.height/2, this.width, this.height);
    g.restore();
}


