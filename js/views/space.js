

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
    this.context.fillStyle = "red";
    this.context.fillRect(5, 5, 25, 25);
};

SpaceView.prototype.initEventListener = function(){
    var self = this;
    document.addEventListener("keydown", function(event){
        console.log("HERE");
        switch (event.keyCode || event.which){
            case 38: // ArrowUp
                console.log("Up");
                self.command.throttle = true;
                break;
            case 37: // ArrowLeft
                console.log("Left");
                self.command.left = true;
                break;
            case 39: // ArrowRight
                console.log("Right");
                self.command.right = true;
                break;
        };
    });

    document.addEventListener("keyup", function(event){
        switch (event.keyCode || event.which){
            case 38: // ArrowUp
                console.log("Up");
                cmd.throttle = false;
                break;
            case 37: // ArrowLeft
                console.log("Left");
                cmd.left = false;
                break;
            case 39: // ArrowRight
                console.log("Right");
                cmd.right = false;
                break;
        };
    });
};
