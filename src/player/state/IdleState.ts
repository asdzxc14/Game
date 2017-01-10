class IdleUpState implements State{

    idleState:PlayerIdleState;

    public constructor(idleState:PlayerIdleState){
        this.idleState = idleState;
    }

    public onEnter() {
        this.idleState.idleAnimeIndex = 0;   
        this.idleState.idleAnime.texture = RES.getRes(idleupconfig[0].image);
        this.idleState.player.playerStage.addChild(this.idleState.idleAnime);

        this.idleState.idleTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleState.idleTimer.start();

    }

    public onExit() {
        this.idleState.player.playerStage.removeChild(this.idleState.idleAnime);

        this.idleState.idleTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleState.idleTimer.stop();

    }

    public timerFunc() {
        if(this.idleState.idleAnimeIndex < (idleupconfig.length -1)) {
            this.idleState.idleAnimeIndex++;
            this.idleState.idleAnime.texture = RES.getRes(idleupconfig[this.idleState.idleAnimeIndex].image);
            console.log("up timer: "+ this.idleState.idleAnimeIndex);
        }else {
            this.idleState.idleAnimeIndex = 0;
                    
        } 

    }

}

class IdleDownState implements State{

    idleState:PlayerIdleState;

    public constructor(idleState:PlayerIdleState){
        this.idleState = idleState;
    }

    public onEnter() {
        this.idleState.idleAnimeIndex = 0;   
        this.idleState.idleAnime.texture = RES.getRes(idledownconfig[0].image);
        this.idleState.player.playerStage.addChild(this.idleState.idleAnime);

        this.idleState.idleTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleState.idleTimer.start();

    }

    public onExit() {
        this.idleState.player.playerStage.removeChild(this.idleState.idleAnime);

        this.idleState.idleTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleState.idleTimer.stop();

    }

    public timerFunc() {
        if(this.idleState.idleAnimeIndex < (idledownconfig.length -1)) {
            this.idleState.idleAnimeIndex++;
            this.idleState.idleAnime.texture = RES.getRes(idledownconfig[this.idleState.idleAnimeIndex].image);
            console.log("down timer: "+ this.idleState.idleAnimeIndex);
        }else {
            this.idleState.idleAnimeIndex = 0;
                    
        }

    }

}

class IdleLeftState implements State{

    idleState:PlayerIdleState;

    public constructor(idleState:PlayerIdleState){
        this.idleState = idleState;
    }

    public onEnter() {
        this.idleState.idleAnimeIndex = 0;   
        this.idleState.idleAnime.texture = RES.getRes(idleleftconfig[0].image);
        this.idleState.player.playerStage.addChild(this.idleState.idleAnime);

        this.idleState.idleTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleState.idleTimer.start();

    }
    
    public onExit() {
        this.idleState.player.playerStage.removeChild(this.idleState.idleAnime);

        this.idleState.idleTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleState.idleTimer.stop();

    }
    
    public timerFunc() {
        if(this.idleState.idleAnimeIndex < (idleleftconfig.length -1)) {
            this.idleState.idleAnimeIndex++;
            this.idleState.idleAnime.texture = RES.getRes(idleleftconfig[this.idleState.idleAnimeIndex].image);
            console.log("left timer: "+ this.idleState.idleAnimeIndex);
        }else {
            this.idleState.idleAnimeIndex = 0;
                    
        } 

    }

}

class IdleRightState implements State{

    idleState:PlayerIdleState;

    public constructor(idleState:PlayerIdleState){
        this.idleState = idleState;
    }

    public onEnter() {
        this.idleState.idleAnimeIndex = 0;   
        this.idleState.idleAnime.texture = RES.getRes(idlerightconfig[0].image);
        this.idleState.player.playerStage.addChild(this.idleState.idleAnime);

        this.idleState.idleTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleState.idleTimer.start();

    }
    
    public onExit() {
        this.idleState.player.playerStage.removeChild(this.idleState.idleAnime);

        this.idleState.idleTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.idleState.idleTimer.stop();

    }
    
    public timerFunc() {
        if(this.idleState.idleAnimeIndex < (idlerightconfig.length -1)) {
            this.idleState.idleAnimeIndex++;
            this.idleState.idleAnime.texture = RES.getRes(idlerightconfig[this.idleState.idleAnimeIndex].image);
            console.log("right timer: "+ this.idleState.idleAnimeIndex);
        }else {
            this.idleState.idleAnimeIndex = 0;
                    
        } 

    }

}


