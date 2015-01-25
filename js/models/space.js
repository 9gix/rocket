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
