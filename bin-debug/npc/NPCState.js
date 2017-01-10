var TaskNoneState = (function () {
    function TaskNoneState(npc) {
        this.npc = npc;
    }
    var d = __define,c=TaskNoneState,p=c.prototype;
    p.onEnter = function () {
        console.log("Enter Task None State");
    };
    p.onExit = function () {
        console.log("Exit Task None State");
    };
    return TaskNoneState;
}());
egret.registerClass(TaskNoneState,'TaskNoneState',["State"]);
var TaskAvilableState = (function () {
    function TaskAvilableState(npc) {
        this.taskSignColor = 0xFF0000;
        this.taskSighX = 15;
        this.taskSighY = 20;
        this.taskSighWidth = 30;
        this.taskSighHeight = 30;
        this.npc = npc;
        this.taskSign = new egret.Shape();
    }
    var d = __define,c=TaskAvilableState,p=c.prototype;
    p.onEnter = function () {
        this.drawTaskSign();
        this.npc.npcStage.addChild(this.taskSign);
        console.log("Enter Task Avilable State");
    };
    p.onExit = function () {
        this.npc.npcStage.removeChild(this.taskSign);
        console.log("Exit Task Avilable State");
    };
    p.drawTaskSign = function () {
        this.taskSign.x = this.taskSighX;
        this.taskSign.y = this.taskSighY;
        this.taskSign.width = this.taskSighWidth;
        this.taskSign.height = this.taskSighHeight;
        this.taskSign.graphics.beginFill(this.taskSignColor, 1);
        this.taskSign.graphics.drawRect(0, 0, this.taskSighWidth, this.taskSighHeight);
        this.taskSign.graphics.endFill();
    };
    return TaskAvilableState;
}());
egret.registerClass(TaskAvilableState,'TaskAvilableState',["State"]);
var TaskSubmitState = (function () {
    function TaskSubmitState(npc) {
        this.taskSignColor = 0xFFFF00;
        this.taskSighX = 15;
        this.taskSighY = 20;
        this.taskSighWidth = 30;
        this.taskSighHeight = 30;
        this.npc = npc;
        this.taskSigh = new egret.Shape();
    }
    var d = __define,c=TaskSubmitState,p=c.prototype;
    p.onEnter = function () {
        this.drawTaskSign();
        this.npc.npcStage.addChild(this.taskSigh);
        console.log("Enter Task Submit State");
    };
    p.onExit = function () {
        this.npc.npcStage.removeChild(this.taskSigh);
        console.log("Exit Task Submit State");
    };
    p.drawTaskSign = function () {
        this.taskSigh.x = this.taskSighX;
        this.taskSigh.y = this.taskSighY;
        this.taskSigh.width = this.taskSighWidth;
        this.taskSigh.height = this.taskSighHeight;
        this.taskSigh.graphics.beginFill(this.taskSignColor, 1);
        this.taskSigh.graphics.drawRect(0, 0, this.taskSighWidth, this.taskSighHeight);
        this.taskSigh.graphics.endFill();
    };
    return TaskSubmitState;
}());
egret.registerClass(TaskSubmitState,'TaskSubmitState',["State"]);
//# sourceMappingURL=NPCState.js.map