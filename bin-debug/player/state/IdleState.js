var IdleUpState = (function () {
    function IdleUpState(idleState) {
        this.idleState = idleState;
    }
    var d = __define,c=IdleUpState,p=c.prototype;
    p.onEnter = function () {
        this.idleState.idleAnimeIndex = 0;
        this.idleState.idleAnime.texture = RES.getRes(idleupconfig[0].image);
        this.idleState.player.playerStage.addChild(this.idleState.idleAnime);
        this.idleState.idleTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.idleState.idleTimer.start();
    };
    p.onExit = function () {
        this.idleState.player.playerStage.removeChild(this.idleState.idleAnime);
        this.idleState.idleTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.idleState.idleTimer.stop();
    };
    p.timerFunc = function () {
        if (this.idleState.idleAnimeIndex < (idleupconfig.length - 1)) {
            this.idleState.idleAnimeIndex++;
            this.idleState.idleAnime.texture = RES.getRes(idleupconfig[this.idleState.idleAnimeIndex].image);
            console.log("up timer: " + this.idleState.idleAnimeIndex);
        }
        else {
            this.idleState.idleAnimeIndex = 0;
        }
    };
    return IdleUpState;
}());
egret.registerClass(IdleUpState,'IdleUpState',["State"]);
var IdleDownState = (function () {
    function IdleDownState(idleState) {
        this.idleState = idleState;
    }
    var d = __define,c=IdleDownState,p=c.prototype;
    p.onEnter = function () {
        this.idleState.idleAnimeIndex = 0;
        this.idleState.idleAnime.texture = RES.getRes(idledownconfig[0].image);
        this.idleState.player.playerStage.addChild(this.idleState.idleAnime);
        this.idleState.idleTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.idleState.idleTimer.start();
    };
    p.onExit = function () {
        this.idleState.player.playerStage.removeChild(this.idleState.idleAnime);
        this.idleState.idleTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.idleState.idleTimer.stop();
    };
    p.timerFunc = function () {
        if (this.idleState.idleAnimeIndex < (idledownconfig.length - 1)) {
            this.idleState.idleAnimeIndex++;
            this.idleState.idleAnime.texture = RES.getRes(idledownconfig[this.idleState.idleAnimeIndex].image);
            console.log("down timer: " + this.idleState.idleAnimeIndex);
        }
        else {
            this.idleState.idleAnimeIndex = 0;
        }
    };
    return IdleDownState;
}());
egret.registerClass(IdleDownState,'IdleDownState',["State"]);
var IdleLeftState = (function () {
    function IdleLeftState(idleState) {
        this.idleState = idleState;
    }
    var d = __define,c=IdleLeftState,p=c.prototype;
    p.onEnter = function () {
        this.idleState.idleAnimeIndex = 0;
        this.idleState.idleAnime.texture = RES.getRes(idleleftconfig[0].image);
        this.idleState.player.playerStage.addChild(this.idleState.idleAnime);
        this.idleState.idleTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.idleState.idleTimer.start();
    };
    p.onExit = function () {
        this.idleState.player.playerStage.removeChild(this.idleState.idleAnime);
        this.idleState.idleTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.idleState.idleTimer.stop();
    };
    p.timerFunc = function () {
        if (this.idleState.idleAnimeIndex < (idleleftconfig.length - 1)) {
            this.idleState.idleAnimeIndex++;
            this.idleState.idleAnime.texture = RES.getRes(idleleftconfig[this.idleState.idleAnimeIndex].image);
            console.log("left timer: " + this.idleState.idleAnimeIndex);
        }
        else {
            this.idleState.idleAnimeIndex = 0;
        }
    };
    return IdleLeftState;
}());
egret.registerClass(IdleLeftState,'IdleLeftState',["State"]);
var IdleRightState = (function () {
    function IdleRightState(idleState) {
        this.idleState = idleState;
    }
    var d = __define,c=IdleRightState,p=c.prototype;
    p.onEnter = function () {
        this.idleState.idleAnimeIndex = 0;
        this.idleState.idleAnime.texture = RES.getRes(idlerightconfig[0].image);
        this.idleState.player.playerStage.addChild(this.idleState.idleAnime);
        this.idleState.idleTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.idleState.idleTimer.start();
    };
    p.onExit = function () {
        this.idleState.player.playerStage.removeChild(this.idleState.idleAnime);
        this.idleState.idleTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.idleState.idleTimer.stop();
    };
    p.timerFunc = function () {
        if (this.idleState.idleAnimeIndex < (idlerightconfig.length - 1)) {
            this.idleState.idleAnimeIndex++;
            this.idleState.idleAnime.texture = RES.getRes(idlerightconfig[this.idleState.idleAnimeIndex].image);
            console.log("right timer: " + this.idleState.idleAnimeIndex);
        }
        else {
            this.idleState.idleAnimeIndex = 0;
        }
    };
    return IdleRightState;
}());
egret.registerClass(IdleRightState,'IdleRightState',["State"]);
//# sourceMappingURL=IdleState.js.map