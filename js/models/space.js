function Space(rocket, platforms){
    this.rocket = rocket;
    this.platforms = platforms;
    this.gravity = 0.32;
    this.drag = 0.21;
}

Space.prototype.update = function() {
	this.rocket.accountGravity(this.gravity);
	this.rocket.accountDrag(this.drag);
	this.rocket.update();
};
