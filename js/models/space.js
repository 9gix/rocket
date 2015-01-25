function Space(rocket, platforms){
    this.rocket = rocket;
    this.gravity = 0.52
    this.platforms = platforms;
}

Space.prototype.update = function() {
	this.rocket.accountGravity(this.gravity);
	this.rocket.update();
};
