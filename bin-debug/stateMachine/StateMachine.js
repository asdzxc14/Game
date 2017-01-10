var StateMachine = (function () {
    function StateMachine(currentState) {
        this.currentState = currentState;
        this.currentState.onEnter();
        //console.log("State Init");
    }
    var d = __define,c=StateMachine,p=c.prototype;
    p.changeState = function (nextState) {
        this.currentState.onExit();
        this.currentState = nextState;
        this.currentState.onEnter();
        // console.log("State change");
    };
    p.getState = function () {
        return this.currentState;
    };
    return StateMachine;
}());
egret.registerClass(StateMachine,'StateMachine');
//# sourceMappingURL=StateMachine.js.map