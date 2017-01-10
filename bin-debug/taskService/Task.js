var TaskStatus = {
    UNACCEPTABLE: 0,
    ACCEOTABLE: 1,
    DURING: 2,
    CAN_SUBMIT: 3,
    SUBMITTED: 4
};
var TaskCondition = (function () {
    function TaskCondition() {
    }
    var d = __define,c=TaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.status = TaskStatus.DURING;
    };
    p.onSubmit = function (task) {
        task.status = TaskStatus.SUBMITTED;
    };
    return TaskCondition;
}());
egret.registerClass(TaskCondition,'TaskCondition');
var NPCTalkTaskCondition = (function () {
    function NPCTalkTaskCondition() {
    }
    var d = __define,c=NPCTalkTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        task.status = TaskStatus.DURING;
    };
    p.onSubmit = function (task) {
        task.status = TaskStatus.SUBMITTED;
    };
    return NPCTalkTaskCondition;
}());
egret.registerClass(NPCTalkTaskCondition,'NPCTalkTaskCondition');
var KillMonsterTaskCondition = (function () {
    function KillMonsterTaskCondition(id, context, scenceService) {
        this.monsterId = id;
        this.context = context;
        this.status = TaskStatus.CAN_SUBMIT;
        this.scenceService = scenceService;
        this.scenceService.addObserver(this);
    }
    var d = __define,c=KillMonsterTaskCondition,p=c.prototype;
    p.onAccept = function (task) {
        this.status = TaskStatus.DURING;
    };
    p.onSubmit = function (task) {
        this.status = TaskStatus.SUBMITTED;
    };
    p.onChange = function (id) {
        if (id == this.monsterId && this.status == TaskStatus.DURING) {
            console.log(this.status);
            this.context.setcurrent(this.context.getcurrent() + 1);
        }
    };
    return KillMonsterTaskCondition;
}());
egret.registerClass(KillMonsterTaskCondition,'KillMonsterTaskCondition',["Observer"]);
var taskConfig = [
    { Id: "000", name: "Task000", desc: "Go to NPC_2", fromNpcId: "npc_0", toNpcId: "npc_1", status: TaskStatus.ACCEOTABLE, current: 0, total: 10 }
];
var Task = (function () {
    function Task(taskService, scenceService, id) {
        this.current = 0;
        this.total = -1;
        for (var i = 0; i < taskConfig.length; i++) {
            if (taskConfig[i].Id == id) {
                this.taskService = taskService;
                this.id = taskConfig[i].Id;
                this.name = taskConfig[i].name;
                this.desc = taskConfig[i].desc;
                this.status = taskConfig[i].status;
                this.fromNpcId = taskConfig[i].fromNpcId;
                this.toNpcId = taskConfig[i].toNpcId;
                this.current = taskConfig[i].current;
                this.total = taskConfig[i].total;
                this.taskCondition = new KillMonsterTaskCondition("001", this, scenceService);
                break;
            }
            else if (i == taskConfig.length - 1) {
                console.log("未找到该任务:" + id);
                break;
            }
        }
    }
    var d = __define,c=Task,p=c.prototype;
    p.onAccept = function () {
        this.taskCondition.onAccept(this);
    };
    p.onsubmit = function () {
        this.taskCondition.onSubmit(this);
    };
    p.getcurrent = function () {
        return this.current;
    };
    p.setcurrent = function (current) {
        this.current = current;
        this.checkStatus();
    };
    p.checkStatus = function () {
        if (this.current >= this.total) {
            this.current = this.total;
            this.status = TaskStatus.CAN_SUBMIT;
            console.log("Finish");
        }
        this.taskService.notify(this);
        console.log(this.status);
    };
    return Task;
}());
egret.registerClass(Task,'Task',["TaskConditionContext"]);
//# sourceMappingURL=Task.js.map