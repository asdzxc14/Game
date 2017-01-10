var stateConfig = {
    idleState:0,
    moveState:1

}

var directionConfig = {
    downState:0,
    upState:1,
    leftState:2,
    rightState:3

}


class Player {

    public static player:Player;

    private callback:Function;

    //人物相关
    playerStage:egret.DisplayObjectContainer;
    playerIdleState:PlayerIdleState;
    playerMovestate:PlayerMoveState;
    playerStateMachine:StateMachine;
    stateSign:number;

    touchX:number;
    touchY:number;

    grid:Grid;
    tileSize:number;

    playerdirection:number;

    public constructor(grid:Grid,tileSize:number) {
        this.setMap(grid,tileSize);
        this.playerStage = new egret.DisplayObjectContainer();
        
        this.playerdirection = directionConfig.downState;
        this.playerIdleState = new PlayerIdleState(this);
        this.playerMovestate = new PlayerMoveState(this);
        this.stateSign = stateConfig.idleState; 
        this.playerStateMachine = new StateMachine(this.playerIdleState);

    }

    public setMap(grid:Grid,tileSize:number) {
        this.grid = grid;
        this.tileSize = tileSize;
    }

    public static setPlayer(player:Player) {
        this.player = player;
    }

    public static getPlayer():Player {
        return this.player;
    }

    public startMove(x:number,y:number,callback:Function) {
        console.log ("移动开始");
        this.touchX = x;
        this.touchY = y;
        this.stateSign = stateConfig.moveState;
        this.callback = callback;
        this.checkstate();

    }

    public stopMove(callback: Function) {
        console.log ("移动取消");
        this.stateSign =stateConfig.idleState;
        this.callback = callback;
        this.checkstate();
        callback();

    }

    public checkstate() {
        switch(this.stateSign) {
            case stateConfig.idleState:
                this.playerStateMachine.changeState(this.playerIdleState);
                this.callback();
                console.log("移动结束");
                break;

            case stateConfig.moveState:
                this.playerMovestate.checkMove(this.touchX,this.touchY);
                break;

        }
    }

    

    
}



