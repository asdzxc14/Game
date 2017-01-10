var stateConfig = {
    idleState: 0,
    moveState: 1
};
var directionConfig = {
    downState: 0,
    upState: 1,
    leftState: 2,
    rightState: 3
};
var Player = (function () {
    function Player(grid, tileSize) {
        this.setMap(grid, tileSize);
        this.playerStage = new egret.DisplayObjectContainer();
        this.playerdirection = directionConfig.downState;
        this.playerIdleState = new PlayerIdleState(this);
        this.playerMovestate = new PlayerMoveState(this);
        this.stateSign = stateConfig.idleState;
        this.playerStateMachine = new StateMachine(this.playerIdleState);
    }
    var d = __define,c=Player,p=c.prototype;
    p.setMap = function (grid, tileSize) {
        this.grid = grid;
        this.tileSize = tileSize;
    };
    Player.setPlayer = function (player) {
        this.player = player;
    };
    Player.getPlayer = function () {
        return this.player;
    };
    p.startMove = function (x, y, callback) {
        console.log("移动开始");
        this.touchX = x;
        this.touchY = y;
        this.stateSign = stateConfig.moveState;
        this.callback = callback;
        this.checkstate();
    };
    p.stopMove = function (callback) {
        console.log("移动取消");
        this.stateSign = stateConfig.idleState;
        this.callback = callback;
        this.checkstate();
        callback();
    };
    p.checkstate = function () {
        switch (this.stateSign) {
            case stateConfig.idleState:
                this.playerStateMachine.changeState(this.playerIdleState);
                this.callback();
                console.log("移动结束");
                break;
            case stateConfig.moveState:
                this.playerMovestate.checkMove(this.touchX, this.touchY);
                break;
        }
    };
    return Player;
}());
egret.registerClass(Player,'Player');
//# sourceMappingURL=Player.js.map