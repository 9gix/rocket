function Space(rocket){
    this.rocket = rocket;
    this.gravity = 0.3;
}

Space.prototype.update = function() {
	this.rocket.accountGravity(this.gravity);
	this.rocket.update();
};