function Space(rocket){
    this.rocket = rocket;
    this.gravity = 0.52
}

Space.prototype.update = function() {
	this.rocket.accountGravity(this.gravity);
	this.rocket.update();
};
