

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
    this.context.fillStyle = "red";
    this.context.fillRect(this.space.rocket.getX(), this.space.rocket.getY(), 25, 25);
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
