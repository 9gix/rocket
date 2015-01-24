'use strict';

var RocketGame = (function(){

    var fps = 60;
    var interval = 1000 / fps;
    var canvas = document.getElementById('rocket-canvas');
    var context = canvas.getContext('2d');
    var rocket = new Rocket();
    var space = new Space(rocket);
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

        setTimeout(gameLogic, interval);
    };

    var startGameLoop = function(){
        gameLogic();
        window.requestAnimationFrame(render);
    };
})();
