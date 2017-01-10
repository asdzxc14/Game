var ErrorCode = {
    NO_ERRIR: 0,
    ID_NOTFOUND: 1
};
var TaskService = (function () {
    function TaskService(scenceService) {
        this.observerList = new Array();
        this.taskList = new Array();
        this.task01 = new Task(this, scenceService, "000");
        this.taskList.push(this.task01);
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.addObserver = function (observer) {
        this.observerList.push(observer);
    };
    p.accept = function (id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                console.log("Find Task: " + this.taskList[i].id);
                this.taskList[i].status = TaskStatus.DURING;
                this.taskList[i].taskCondition.onAccept(this.taskList[i]);
                this.notify(this.taskList[i]);
                return ErrorCode.NO_ERRIR;
            }
            else if (i == this.taskList.length - 1) {
                return ErrorCode.ID_NOTFOUND;
            }
        }
    };
    p.finish = function (id) {
        for (var i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].id == id) {
                this.taskList[i].status = TaskStatus.SUBMITTED;
                this.taskList[i].taskCondition.onSubmit(this.taskList[i]);
                this.notify(this.taskList[i]);
                return ErrorCode.NO_ERRIR;
            }
            else if (i == this.taskList.length - 1) {
                return ErrorCode.ID_NOTFOUND;
            }
        }
    };
    p.getTaskByCustomRole = function (rule, Id) {
        return rule(this.taskList, Id);
    };
    p.notify = function (task) {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(task);
        }
    };
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService',["EventEmitter"]);
//# sourceMappingURL=TaskService.js.map