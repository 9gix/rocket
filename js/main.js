'use strict';

var RocketGame = (function(){

    var fps = 60;
    var interval = 1000 / fps;
    var gc = new GameController();

    document.addEventListener("DOMContentLoaded", function(event){
        initGame();
    });

    var initGame = function(){
        initEventListener();
        startGameLoop();
    };

    var initEventListener = function(){
        document.addEventListener("keydown", function(event){
            switch (event.keyCode || event.which){
                case 38: // ArrowUp
                    console.log("Up");
                    gc.throttle();
                    break;
                case 37: // ArrowLeft
                    console.log("Left");
                    gc.turnLeft();
                    break;
                case 39: // ArrowRight
                    console.log("Right");
                    gc.turnRight();
                    break;
            };
        });
    };

    var render = function(){
        // Render Logic


        window.requestAnimationFrame(render);
    };

    var gameLogic = function(){
        // Game Logic

        setTimeout(gameLogic, interval);
    };

    var startGameLoop = function(){
        gameLogic();
        window.requestAnimationFrame(render);
    };
})();
