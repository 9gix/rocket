'use strict';

var RocketGame = (function(){

    var fps = 60;
    var interval = 1000 / fps;
    var canvas = document.getElementById('rocket-canvas');
    canvas.width = 1000;
    canvas.height = 500;
    var context = canvas.getContext('2d');


    var rocket = new Rocket(100, 380);
    var start_platform = new Platform(100, 415);
    var end_platform = new Platform(600, 200);
    var space = new Space(rocket, [start_platform, end_platform]);
    var gc = new GameController(space);
    var spaceview = new SpaceView(context, space);

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
        if (spaceview.command.left){
            gc.rotateLeft();
        }
        if (spaceview.command.right){
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
