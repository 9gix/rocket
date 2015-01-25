"use strict";
/**
 * SoundEngine.js by Andhieka Putra
 * Plays sound using the browser's Web Audio API
 */

/* MAIN CLASS BODY */
var SoundEngine = function() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.loadSounds();
    this.sideRocketGain = this.audioContext.createGain();
    this.sideRocketGain.connect(this.audioContext.destination);
    this.sideRocketGain.gain.value = 0.07;
}

SoundEngine.prototype.startRocket = function() {
    if (this.rocketGain == null) {
        var rocketSource = this.audioContext.createBufferSource();
        this.rocketGain = this.audioContext.createGain();

        rocketSource.buffer = this.rocketBuffer;
        rocketSource.loop = true;
        rocketSource.loopStart = 1.52;
        rocketSource.loopEnd = 5.0;
        rocketSource.start(0);

        rocketSource.connect(this.rocketGain);
        this.rocketGain.connect(this.audioContext.destination);
    }
    this.rocketGain.gain.value = 1.5;
};

SoundEngine.prototype.stopRocket = function() {
    if (this.rocketGain != null) {
        this.rocketGain.gain.value = 0.0;
    }
};

SoundEngine.prototype.startLeftRocket = function() {
    if (this.leftRocketPlaying == true) {
        return;
    }
    if (this.rightRocketSource != null) {
        this.rightRocketSource.stop();
        this.rightRocketPlaying = false;
    }
    var leftRocketSource = this.audioContext.createBufferSource();
    leftRocketSource.buffer = this.sideRocketBuffer;
    leftRocketSource.connect(this.sideRocketGain);
    leftRocketSource.start(0);
    this.leftRocketSource = leftRocketSource;
    this.leftRocketPlaying = true;
    leftRocketSource.onended = function() {
        this.leftRocketPlaying = false;
    }
};

SoundEngine.prototype.startRightRocket = function() {
    if (this.rightRocketPlaying == true) {
        return;
    }
    if (this.leftRocketSource != null) {
        this.leftRocketSource.stop();
        this.leftRocketPlaying = false;
    }
    var rightRocketSource = this.audioContext.createBufferSource();
    rightRocketSource.buffer = this.sideRocketBuffer;
    rightRocketSource.connect(this.sideRocketGain);
    rightRocketSource.start(0);
    this.rightRocketSource = rightRocketSource;
    this.rightRocketPlaying = true;
    rightRocketSource.onended = function() {
        this.rightRocketPlaying = false;
    }
};


SoundEngine.prototype.explode = function() {
    var explodeSource = this.audioContext.createBufferSource();
    explodeSource.buffer = this.explosionBuffer;
    explodeSource.connect(this.audioContext.destination);
    explodeSource.start(0);
};

SoundEngine.prototype.startFireworks = function() {
    if (this.fireworksSource != null) {
        this.fireworksSource.stop();
    }

    var fireworksSource = this.audioContext.createBufferSource();
    fireworksSource.buffer = this.fireworksBuffer;
    fireworksSource.connect(this.audioContext.destination);
    fireworksSource.start(0);

    this.fireworksSource = fireworksSource;
};

SoundEngine.prototype.stopFireworks = function() {
    this.fireworksSource.stop();
};

SoundEngine.prototype.loadSounds = function() {
    var soundEngine = this;

    var fireworksRequest = new XMLHttpRequest();
    fireworksRequest.open("GET", "assets/fireworks.mp3", true);
    fireworksRequest.responseType = 'arraybuffer';
    // Decode asynchronously
    fireworksRequest.onload = function() {
        soundEngine.audioContext.decodeAudioData(
            fireworksRequest.response,
            function(buffer) {
                soundEngine.fireworksBuffer = buffer;
            });
    }
    fireworksRequest.send();

    var explosionRequest = new XMLHttpRequest();
    explosionRequest.open("GET", "assets/explosion.mp3", true);
    explosionRequest.responseType = 'arraybuffer';
    // Decode asynchronously
    explosionRequest.onload = function() {
        soundEngine.audioContext.decodeAudioData(
            explosionRequest.response,
            function(buffer) {
                soundEngine.explosionBuffer = buffer;
            });
    }
    explosionRequest.send();

    var rocketRequest = new XMLHttpRequest();
    rocketRequest.open("GET", "assets/rocket.mp3", true);
    rocketRequest.responseType = 'arraybuffer';
    // Decode asynchronously
    rocketRequest.onload = function() {
        soundEngine.audioContext.decodeAudioData(
            rocketRequest.response,
            function(buffer) {
                soundEngine.rocketBuffer = buffer;
            });
    }
    rocketRequest.send();

    var sideRocketRequest = new XMLHttpRequest();
    sideRocketRequest.open("GET", "assets/sideRocket.mp3", true);
    sideRocketRequest.responseType = 'arraybuffer';
    // Decode asynchronously
    sideRocketRequest.onload = function() {
        soundEngine.audioContext.decodeAudioData(
            sideRocketRequest.response,
            function(buffer) {
                soundEngine.sideRocketBuffer = buffer;
            });
    }
    sideRocketRequest.send();
};

