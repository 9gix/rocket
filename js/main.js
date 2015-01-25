'use strict';

var RocketGame = (function(){

    var fps = 60;
    var interval = 1000 / fps;
    var canvas = document.getElementById('rocket-canvas');
    canvas.width = 1000;
    canvas.height = 500;
    var context = canvas.getContext('2d');
    var rocket = new Rocket(40, 390);
    var space = new Space(rocket);
    var gc = new GameController(space);
    var spaceview = new SpaceView(context, space);
    var sprites = [];
    var start_platform = new Platform(40, 415);
    var end_platform = new Platform(600, 200);
    sprites.push(start_platform);
    sprites.push(end_platform);
    space.setSprites(sprites);
    var assetManager;
    var soundEngine = new SoundEngine();
    document.addEventListener("DOMContentLoaded", function(event){
        initGame();
    });

    var initGame = function(){
        spaceview.initEventListener();
        startGameLoop();
    };


    var render = function(){
        // Render Logic
        spaceview.render();
        window.requestAnimationFrame(render);
    };

    var gameLogic = function(){
        // Game Logic
        if (spaceview.command.throttle){
            space.insertSprite(new ThrustEffect(space.rocket.x, space.rocket.y, space.rocket.getAngle()));
            gc.throttle();
            soundEngine.startRocket();
        } else {
            soundEngine.stopRocket();
        }

        if (spaceview.command.left){
            gc.rotateLeft();
            soundEngine.startLeftRocket();
        } else {
            soundEngine.stopLeftRocket();
        }

        if (spaceview.command.right){
            gc.rotateRight();
            soundEngine.startRightRocket();
        } else {
            soundEngine.stopRightRocket();
        }

        gc.update();

        setTimeout(gameLogic, interval);
    };

    var startGameLoop = function(){
        gameLogic();
        window.requestAnimationFrame(render);
    };
})();
