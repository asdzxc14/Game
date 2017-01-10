var MoveUpState = (function () {
    function MoveUpState(moveState) {
        this.moveState = moveState;
    }
    var d = __define,c=MoveUpState,p=c.prototype;
    p.onEnter = function () {
        this.moveState.moveAnimeIndex = 0;
        this.moveState.moveAnime.texture = RES.getRes(moveupconfig[0].image);
        this.moveState.player.playerStage.addChild(this.moveState.moveAnime);
        this.moveState.moveTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.moveState.moveTimer.start();
    };
    p.onExit = function () {
        this.moveState.player.playerStage.removeChild(this.moveState.moveAnime);
        this.moveState.moveTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.moveState.moveTimer.stop();
    };
    p.timerFunc = function () {
        if (this.moveState.moveAnimeIndex < (moveupconfig.length - 1)) {
            this.moveState.moveAnimeIndex++;
            this.moveState.moveAnime.texture = RES.getRes(moveupconfig[this.moveState.moveAnimeIndex].image);
            console.log("up timer: " + this.moveState.moveAnimeIndex);
        }
        else {
            this.moveState.moveAnimeIndex = 0;
        }
    };
    return MoveUpState;
}());
egret.registerClass(MoveUpState,'MoveUpState',["State"]);
var MoveDownState = (function () {
    function MoveDownState(moveState) {
        this.moveState = moveState;
    }
    var d = __define,c=MoveDownState,p=c.prototype;
    p.onEnter = function () {
        this.moveState.moveAnimeIndex = 0;
        this.moveState.moveAnime.texture = RES.getRes(movedownconfig[0].image);
        this.moveState.player.playerStage.addChild(this.moveState.moveAnime);
        this.moveState.moveTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.moveState.moveTimer.start();
    };
    p.onExit = function () {
        this.moveState.player.playerStage.removeChild(this.moveState.moveAnime);
        this.moveState.moveTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.moveState.moveTimer.stop();
    };
    p.timerFunc = function () {
        if (this.moveState.moveAnimeIndex < (movedownconfig.length - 1)) {
            this.moveState.moveAnimeIndex++;
            this.moveState.moveAnime.texture = RES.getRes(movedownconfig[this.moveState.moveAnimeIndex].image);
        }
        else {
            this.moveState.moveAnimeIndex = 0;
        }
    };
    return MoveDownState;
}());
egret.registerClass(MoveDownState,'MoveDownState',["State"]);
var MoveLeftState = (function () {
    function MoveLeftState(moveState) {
        this.moveState = moveState;
    }
    var d = __define,c=MoveLeftState,p=c.prototype;
    p.onEnter = function () {
        this.moveState.moveAnimeIndex = 0;
        this.moveState.moveAnime.texture = RES.getRes(moveleftconfig[0].image);
        this.moveState.player.playerStage.addChild(this.moveState.moveAnime);
        this.moveState.moveTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.moveState.moveTimer.start();
    };
    p.onExit = function () {
        this.moveState.player.playerStage.removeChild(this.moveState.moveAnime);
        this.moveState.moveTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.moveState.moveTimer.stop();
    };
    p.timerFunc = function () {
        if (this.moveState.moveAnimeIndex < (moveleftconfig.length - 1)) {
            this.moveState.moveAnimeIndex++;
            this.moveState.moveAnime.texture = RES.getRes(moveleftconfig[this.moveState.moveAnimeIndex].image);
            console.log("left timer: " + this.moveState.moveAnimeIndex);
        }
        else {
            this.moveState.moveAnimeIndex = 0;
        }
    };
    return MoveLeftState;
}());
egret.registerClass(MoveLeftState,'MoveLeftState',["State"]);
var MoveRightState = (function () {
    function MoveRightState(moveState) {
        this.moveState = moveState;
    }
    var d = __define,c=MoveRightState,p=c.prototype;
    p.onEnter = function () {
        this.moveState.moveAnimeIndex = 0;
        this.moveState.moveAnime.texture = RES.getRes(moverightconfig[0].image);
        this.moveState.player.playerStage.addChild(this.moveState.moveAnime);
        this.moveState.moveTimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.moveState.moveTimer.start();
    };
    p.onExit = function () {
        this.moveState.player.playerStage.removeChild(this.moveState.moveAnime);
        this.moveState.moveTimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.moveState.moveTimer.stop();
    };
    p.timerFunc = function () {
        if (this.moveState.moveAnimeIndex < (moverightconfig.length - 1)) {
            this.moveState.moveAnimeIndex++;
            this.moveState.moveAnime.texture = RES.getRes(moverightconfig[this.moveState.moveAnimeIndex].image);
        }
        else {
            this.moveState.moveAnimeIndex = 0;
        }
    };
    return MoveRightState;
}());
egret.registerClass(MoveRightState,'MoveRightState',["State"]);
//# sourceMappingURL=MoveState.js.map