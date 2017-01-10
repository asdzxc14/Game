class MoveUpState implements State {

    moveState:PlayerMoveState;

    public constructor(moveState:PlayerMoveState){
        this.moveState = moveState;
    }

    public onEnter() {
        this.moveState.moveAnimeIndex = 0;   
        this.moveState.moveAnime.texture = RES.getRes(moveupconfig[0].image);
        this.moveState.player.playerStage.addChild(this.moveState.moveAnime);

        this.moveState.moveTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveState.moveTimer.start();

    }

    public onExit() {
        this.moveState.player.playerStage.removeChild(this.moveState.moveAnime);

        this.moveState.moveTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveState.moveTimer.stop();

    }

    public timerFunc() {    
        if(this.moveState.moveAnimeIndex < (moveupconfig.length -1)) {
            this.moveState.moveAnimeIndex++;
            this.moveState.moveAnime.texture = RES.getRes(moveupconfig[this.moveState.moveAnimeIndex].image);
            console.log("up timer: "+ this.moveState.moveAnimeIndex);
        }else {
            this.moveState.moveAnimeIndex = 0;
                    
        }

    }

}

class MoveDownState implements State {

    moveState:PlayerMoveState;

    public constructor(moveState:PlayerMoveState) {
        this.moveState = moveState;
    }

    public onEnter() {
        this.moveState.moveAnimeIndex = 0;   
        this.moveState.moveAnime.texture = RES.getRes(movedownconfig[0].image);
        this.moveState.player.playerStage.addChild(this.moveState.moveAnime);

        this.moveState.moveTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveState.moveTimer.start();

    }

    public onExit() {
        this.moveState.player.playerStage.removeChild(this.moveState.moveAnime);

        this.moveState.moveTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveState.moveTimer.stop();

    }

    public timerFunc() {
        if(this.moveState.moveAnimeIndex < (movedownconfig.length -1)) {
            this.moveState.moveAnimeIndex++;
            this.moveState.moveAnime.texture = RES.getRes(movedownconfig[this.moveState.moveAnimeIndex].image);
            //console.log("down timer: "+ this.moveState.moveAnimeIndex);
        }else {
            this.moveState.moveAnimeIndex = 0;
                    
        } 

    }

}

class MoveLeftState implements State {

    moveState:PlayerMoveState;

    public constructor(moveState:PlayerMoveState){
        this.moveState = moveState;
    }

    public onEnter() {
        this.moveState.moveAnimeIndex = 0;   
        this.moveState.moveAnime.texture = RES.getRes(moveleftconfig[0].image);
        this.moveState.player.playerStage.addChild(this.moveState.moveAnime);

        this.moveState.moveTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveState.moveTimer.start();

    }

    public onExit() {
        this.moveState.player.playerStage.removeChild(this.moveState.moveAnime);

        this.moveState.moveTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveState.moveTimer.stop();

    }

    public timerFunc() {
        if(this.moveState.moveAnimeIndex < (moveleftconfig.length -1)) {
            this.moveState.moveAnimeIndex++;
            this.moveState.moveAnime.texture = RES.getRes(moveleftconfig[this.moveState.moveAnimeIndex].image);
            console.log("left timer: "+ this.moveState.moveAnimeIndex);
        }else {
            this.moveState.moveAnimeIndex = 0;
                    
        } 

    }

}

class MoveRightState implements State {

    moveState:PlayerMoveState;

    public constructor(moveState:PlayerMoveState){
        this.moveState = moveState;
    }

    public onEnter() {
        this.moveState.moveAnimeIndex = 0;   
        this.moveState.moveAnime.texture = RES.getRes(moverightconfig[0].image);
        this.moveState.player.playerStage.addChild(this.moveState.moveAnime);

        this.moveState.moveTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveState.moveTimer.start();

    }

    public onExit() {
        this.moveState.player.playerStage.removeChild(this.moveState.moveAnime);

        this.moveState.moveTimer.removeEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.moveState.moveTimer.stop();

    }

    public timerFunc() {
        if(this.moveState.moveAnimeIndex < (moverightconfig.length -1)) {
            this.moveState.moveAnimeIndex++;
            this.moveState.moveAnime.texture = RES.getRes(moverightconfig[this.moveState.moveAnimeIndex].image);
            //console.log("right timer: "+ this.moveState.moveAnimeIndex);
        }else {
            this.moveState.moveAnimeIndex = 0;
                    
        } 

    }

}

