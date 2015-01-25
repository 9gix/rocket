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
        rocketSource.buffer = this.rocketBuffer;
        rocketSource.loop = true;
        rocketSource.loopStart = 1.52;
        rocketSource.loopEnd = 5.0;
        rocketSource.start(0);

        this.rocketGain = this.audioContext.createGain();
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
    if (this.leftRocketGain == null) {
        var leftRocketSource = this.audioContext.createBufferSource();
        leftRocketSource.buffer = this.sideRocketBuffer;
        leftRocketSource.loop = true;
        leftRocketSource.loopStart = 0.2;
        leftRocketSource.loopEnd = 0.5;
        leftRocketSource.start(0);

        var channelSplitter = this.audioContext.createChannelSplitter(2);
        leftRocketSource.connect(channelSplitter);
        
        var rightGain = this.audioContext.createGain();
        rightGain.gain.value = 0.2;
        channelSplitter.connect(rightGain, 1, 0);

        var channelMerger = this.audioContext.createChannelMerger(2);
        channelSplitter.connect(channelMerger, 0, 0);
        rightGain.connect(channelMerger, 0, 1); 

        this.leftRocketGain = this.audioContext.createGain();
        channelMerger.connect(this.leftRocketGain);

        this.leftRocketGain.connect(this.audioContext.destination);
    }
    this.leftRocketGain.gain.value = 0.7;
};

SoundEngine.prototype.startRightRocket = function() {
    if (this.rightRocketGain == null) {
        var rightRocketSource = this.audioContext.createBufferSource();
        rightRocketSource.buffer = this.sideRocketBuffer;
        rightRocketSource.loop = true;
        rightRocketSource.loopStart = 0.2;
        rightRocketSource.loopEnd = 0.5;
        rightRocketSource.start(0);

        var channelSplitter = this.audioContext.createChannelSplitter(2);
        rightRocketSource.connect(channelSplitter);
        
        var leftGain = this.audioContext.createGain();
        leftGain.gain.value = 0.2;
        channelSplitter.connect(leftGain, 0, 0);

        var channelMerger = this.audioContext.createChannelMerger(2);
        channelSplitter.connect(channelMerger, 1, 1); //route both channel
        leftGain.connect(channelMerger, 0, 0); //to left speaker

        this.rightRocketGain = this.audioContext.createGain();
        channelMerger.connect(this.rightRocketGain);

        this.rightRocketGain.connect(this.audioContext.destination);
    }
    this.rightRocketGain.gain.value = 0.7;
};

SoundEngine.prototype.stopRightRocket = function() {
    if (this.rightRocketGain != null) {
        this.rightRocketGain.gain.value = 0;
    }
};

SoundEngine.prototype.stopLeftRocket = function() {
    if (this.leftRocketGain != null) {
        this.leftRocketGain.gain.value = 0;
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

