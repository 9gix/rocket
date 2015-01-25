

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
    var rocket = this.space.rocket;
    if(!rocket.isAlive) return;
    var ctx = this.context;
    ctx.save();
    ctx.translate(rocket.getX(), rocket.getY());
    ctx.rotate(Math.PI/180 * rocket.getAngle());
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    var width = 10;
    var height = 30;
    var offset = 6;
    ctx.beginPath();
    ctx.moveTo(width-width, 0  - height/2);
    ctx.lineTo(0-width, height);
    ctx.bezierCurveTo(offset-width,height-offset,2*width-offset-width,height-offset,2*width-width,height);
    //ctx.lineTo(width,0);
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
