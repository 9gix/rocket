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
    sprites.push(new Platform(40, 350));
    space.setSprites(sprites);
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
            gc.throttle();
        }
        else if (spaceview.command.left){
            gc.rotateLeft();
        }
        else if (spaceview.command.right){
            gc.rotateRight();
        }

        gc.update();

        setTimeout(gameLogic, interval);
    };

    var startGameLoop = function(){
        gameLogic();
        window.requestAnimationFrame(render);
    };
})();
