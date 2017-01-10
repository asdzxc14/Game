/*
使用方法：
    1.drawPanel();
    2.获得panel
*/
var tasklPanelPosConfig = {
    x: 0, y: 700
};
var TaskPanel = (function () {
    function TaskPanel(stage, taskService) {
        this.id = "TaskPanel";
        this.backColor = 0xFFFAFA;
        this.panelX = tasklPanelPosConfig.x;
        this.panelY = tasklPanelPosConfig.y;
        this.panelWidth = 200;
        this.panelHeight = 300;
        this.taskNameTextFieldText = "Task";
        this.taskNameTextFieldX = 40;
        this.taskNameTextFieldY = 30;
        this.taskNameTextFieldWidth = 200;
        this.taskNameTextFieldColor = 0xFF0000;
        this.taskDescTextFieldText = "Task";
        this.taskDescTextFieldX = 10;
        this.taskDescTextFieldY = 100;
        this.taskDescTextFieldWidth = 180;
        this.taskDescTextFieldColor = 0xFF0000;
        this.taskProcessTextFieldText = "0/0";
        this.taskProcessTextFieldX = 10;
        this.taskProcessTextFieldY = 170;
        this.taskProcessTextFieldWidth = 180;
        this.taskProcessTextFieldColor = 0xFF0000;
        this.buttonColor = 0x808000;
        this.buttonX = 50;
        this.buttonY = 200;
        this.buttonWidth = 100;
        this.buttonHeight = 50;
        this.buttonTextFieldText = "确认";
        this.buttonTextFieldX = this.buttonX + 15;
        this.buttonTextFieldY = this.buttonY + 10;
        this.buttonTextFieldWidth = 100;
        this.buttonTextFieldColor = 0xFFFAFA;
        this.stage = stage;
        this.taskService = taskService;
        this.taskService.addObserver(this);
        this.panel = new egret.DisplayObjectContainer();
        this.taskNameTextField = new egret.TextField();
        this.taskDescTextField = new egret.TextField();
        this.taskProcessTextField = new egret.TextField();
        this.backGround = new egret.Shape();
        this.button = new egret.DisplayObjectContainer();
        this.buttonBack = new egret.Shape();
        this.buttonTextField = new egret.TextField();
        this.drawPanel();
        this.getTask();
        this.stage.addChild(this.panel);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.setText = function () {
        this.taskNameTextField.text = this.taskNameTextFieldText;
        this.taskNameTextField.x = this.taskNameTextFieldX;
        this.taskNameTextField.y = this.taskNameTextFieldY;
        this.taskNameTextField.width = this.taskNameTextFieldWidth;
        this.taskNameTextField.bold = true;
        this.taskNameTextField.textColor = this.taskNameTextFieldColor;
        this.taskDescTextField.text = this.taskDescTextFieldText;
        this.taskDescTextField.x = this.taskDescTextFieldX;
        this.taskDescTextField.y = this.taskDescTextFieldY;
        this.taskDescTextField.width = this.taskDescTextFieldWidth;
        this.taskDescTextField.bold = false;
        this.taskDescTextField.textColor = this.taskDescTextFieldColor;
        this.taskProcessTextField.text = this.taskProcessTextFieldText;
        this.taskProcessTextField.x = this.taskProcessTextFieldX;
        this.taskProcessTextField.y = this.taskProcessTextFieldY;
        this.taskProcessTextField.width = this.taskProcessTextFieldWidth;
        this.taskProcessTextField.bold = false;
        this.taskProcessTextField.textColor = this.taskProcessTextFieldColor;
    };
    p.drawBackGround = function () {
        this.backGround.graphics.beginFill(this.backColor, 1);
        this.backGround.graphics.drawRect(0, 0, this.panelWidth, this.panelHeight);
        this.backGround.graphics.endFill();
    };
    p.drawButtonBack = function () {
        this.buttonBack.graphics.beginFill(this.buttonColor, 1);
        this.buttonBack.graphics.drawRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
        this.buttonBack.graphics.endFill();
    };
    p.setButtonText = function () {
        this.buttonTextField.text = this.buttonTextFieldText;
        this.buttonTextField.x = this.buttonTextFieldX;
        this.buttonTextField.y = this.buttonTextFieldY;
        this.buttonTextField.width = this.buttonTextFieldWidth;
        this.buttonTextField.bold = false;
        this.buttonTextField.textColor = this.buttonTextFieldColor;
    };
    p.drawButton = function () {
        this.drawButtonBack();
        this.setButtonText();
        this.button.addChild(this.buttonBack);
        this.button.addChild(this.buttonTextField);
    };
    p.drawPanel = function () {
        this.panel.x = this.panelX;
        this.panel.y = this.panelY;
        this.panel.width = this.panelWidth;
        this.panel.height = this.panelHeight;
        this.drawButton();
        this.drawBackGround();
        this.setText();
        this.panel.addChild(this.backGround);
        this.panel.addChild(this.taskNameTextField);
        this.panel.addChild(this.taskDescTextField);
        this.panel.addChild(this.taskProcessTextField);
        this.panel.addChild(this.button);
    };
    p.onChange = function (task) {
        this.currentTaskId = task.id;
        this.changeTaskText(task.name, task.desc, task.current, task.total);
        this.changeButton(task.status);
        this.currentTaskStatus = task.status;
        //this.showPanel();
    }; //被通知
    p.changeTaskText = function (name, desc, current, total) {
        this.taskNameTextField.text = name;
        this.taskDescTextField.text = desc;
        this.taskProcessTextField.text = current + "/" + total;
    };
    p.changeButton = function (taskStatus) {
        switch (taskStatus) {
            case TaskStatus.ACCEOTABLE:
                this.buttonTextField.text = "可接受";
                break;
            case TaskStatus.DURING:
                this.buttonTextField.text = "进行中";
                break;
            case TaskStatus.CAN_SUBMIT:
                this.buttonTextField.text = "可提交";
                break;
            case TaskStatus.SUBMITTED:
                this.buttonTextField.text = "已完成";
                break;
            default:
                this.buttonTextField.text = "";
                break;
        }
    };
    p.rule = function (taskList, id) {
        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].status != TaskStatus.UNACCEPTABLE) {
                console.log(id + " Find Task");
                return taskList[i];
            }
        }
    };
    p.getTask = function () {
        var task = this.taskService.getTaskByCustomRole(this.rule, this.id);
        this.onChange(task);
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
//# sourceMappingURL=TaskPanel.js.map