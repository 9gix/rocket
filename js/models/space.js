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



function ThrustEffect(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.delta = 1;
    this.isAlive = true;
}

ThrustEffect.prototype.update = function() {
    this.delta -= 0.5;
    if(this.delta == 0) this.isAlive = false;
}

ThrustEffect.prototype.render = function(g) {
    if(!this.isAlive) return;
    g.save();
    g.strokeStyle = "rgba(255,255,255," + this.delta + ")";
    g.translate(this.x, this.y);
    g.rotate(this.angle /180 * Math.PI);
    g.beginPath();
    g.arc(0,0,40, 0.33 * Math.PI, 0.66 *  Math.PI);
    g.stroke();
    g.restore();
}

ThrustEffect.prototype.collissionHandler = function() {}