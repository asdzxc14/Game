var npcConfig = [
    { npcId: "npc_0", name: "NPC_1", x: 256, y: 448, bitmap: "player01_idle_left_png", talkPosX: 192, talkPosY: 512 },
    { npcId: "npc_1", name: "NPC_2", x: 448, y: 64, bitmap: "player01_idle_right_png", talkPosX: 512, talkPosY: 128 }
];
var NPC = (function () {
    function NPC(npcId, taskService, dialoguePanel) {
        this.tileSize = 64;
        this.emojiX = 0;
        this.emojiY = 64;
        this.npcStageWidth = 64;
        this.npcStageHeight = 128;
        this.npcStage = new egret.DisplayObjectContainer();
        this.npcStageShape = new egret.Shape();
        this.emoji = new egret.Bitmap();
        for (var i = 0; i < npcConfig.length; i++) {
            if (npcId == npcConfig[i].npcId) {
                this.npcId = npcConfig[i].npcId;
                this.npcName = npcConfig[i].name;
                this.npcBitmap = npcConfig[i].bitmap;
                this.setNpc(npcConfig[i].x, npcConfig[i].y);
                this.talkPosX = npcConfig[i].talkPosX;
                this.talkPosY = npcConfig[i].talkPosY;
            }
        }
        this.taskService = taskService;
        this.taskService.addObserver(this);
        this.taskNoneState = new TaskNoneState(this);
        this.taskAvilableState = new TaskAvilableState(this);
        this.taskSubmitState = new TaskSubmitState(this);
        this.taskStateMachine = new StateMachine(this.taskNoneState);
        this.dialoguePanel = dialoguePanel;
        this.getTask();
        this.drawNpc();
    }
    var d = __define,c=NPC,p=c.prototype;
    p.showNpc = function (stage) {
        stage.addChild(this.npcStage);
    };
    NPC.setCurrentNpc = function (npc) {
        this._currentNpc = npc;
    };
    NPC.getCurrentNpc = function () {
        return this._currentNpc;
    };
    p.getTask = function () {
        this.task = this.taskService.getTaskByCustomRole(this.rule, this.npcId);
        console.log("This Task State: " + this.task.status);
        this.checkState();
    };
    p.setemoji = function () {
        this.emoji.texture = RES.getRes(this.npcBitmap);
        this.emoji.x = this.emojiX;
        this.emoji.y = this.emojiY;
        this.emoji.width = this.tileSize;
        this.emoji.height = this.tileSize;
    };
    p.setNpc = function (npcX, npcY) {
        this.npcStageX = npcX;
        this.npcStageY = npcY;
        this.setemoji();
    };
    p.drawNpc = function () {
        this.npcStage.x = this.npcStageX;
        this.npcStage.y = this.npcStageY;
        this.npcStage.width = this.npcStageWidth;
        this.npcStage.height = this.npcStageHeight;
        this.npcStage.addChild(this.npcStageShape);
        this.npcStage.addChild(this.emoji);
        this.emoji.touchEnabled = true;
    };
    p.checkState = function () {
        switch (this.task.status) {
            case TaskStatus.UNACCEPTABLE:
            case TaskStatus.DURING:
            case TaskStatus.SUBMITTED:
                this.taskStateMachine.changeState(this.taskNoneState);
                break;
            case TaskStatus.ACCEOTABLE:
                if (this.task.fromNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskAvilableState);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
            case TaskStatus.CAN_SUBMIT:
                if (this.task.toNpcId == this.npcId) {
                    this.taskStateMachine.changeState(this.taskSubmitState);
                }
                else {
                    this.taskStateMachine.changeState(this.taskNoneState);
                }
                break;
        }
    };
    p.onChange = function (task) {
        this.task = task;
        this.checkState();
    };
    p.rule = function (taskList, npcId) {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].fromNpcId == npcId || taskList[i].toNpcId == npcId) {
                console.log("Find");
                return taskList[i];
            }
        }
    };
    p.talkToNpc = function (callback) {
        if (this.task.status == TaskStatus.ACCEOTABLE && this.task.fromNpcId == this.npcId) {
            this.dialoguePanel.onOpen(this.task, callback);
        }
        else if (this.task.status == TaskStatus.CAN_SUBMIT && this.task.toNpcId == this.npcId) {
            this.dialoguePanel.onOpen(this.task, callback);
        }
    };
    p.stopTalkToNpc = function (callback) {
        this.dialoguePanel.onClose(callback);
    };
    return NPC;
}());
egret.registerClass(NPC,'NPC',["Observer"]);
//# sourceMappingURL=NPC.js.map