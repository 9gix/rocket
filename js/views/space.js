

function SpaceView(context, space){
    this.context = context;
    this.space = space;
    this.command = {
        throttle: false,
        left: false,
        right: false,
    };
}

SpaceView.prototype.render = function(){
    this.context.clearRect(0, 0, 1024, 640);
    this.renderRocket();
    for (var i = 0; i < this.space.sprites.length; ++i) {
        this.space.sprites[i].render(this.context);
    }
};

SpaceView.prototype.renderRocket = function(){
    if(!this.space.rocket.isAlive) return;
    var ctx = this.context;
    ctx.save();
    ctx.translate(this.space.rocket.getX() - 10, this.space.rocket.getY()-20);
    ctx.rotate(Math.PI/180 * this.space.rocket.getAngle());
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    var width = 10;
    var height = 30;
    var offset = 6;
    ctx.beginPath();
    ctx.moveTo(width,0);
    ctx.lineTo(0,height);
    ctx.bezierCurveTo(offset,height-offset,2*width-offset,height-offset,2*width,height);
    ctx.lineTo(width,0);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
};

SpaceView.prototype.initEventListener = function(){
    var self = this;
    document.addEventListener("keydown", function(event){
        switch (event.keyCode || event.which){
            case 38: // ArrowUp
                console.log("Start Thorttle");
                self.command.throttle = true;
                break;
            case 37: // ArrowLeft
                console.log("Start Left Rotation");
                self.command.left = true;
                break;
            case 39: // ArrowRight
                console.log("Start Right Rotation");
                self.command.right = true;
                break;
        };
    });

    document.addEventListener("keyup", function(event){
        switch (event.keyCode || event.which){
            case 38: // ArrowUp
                console.log("Stop Throttle");
                self.command.throttle = false;
                break;
            case 37: // ArrowLeft
                console.log("Stop Left Rotation");
                self.command.left = false;
                break;
            case 39: // ArrowRight
                console.log("Stop Right Rotation");
                self.command.right = false;
                break;
        };
    });
};
