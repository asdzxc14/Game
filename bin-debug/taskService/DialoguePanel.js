var dialoguePanelPosConfig = {
    x: 450, y: 700
};
var DialoguePanel = (function () {
    function DialoguePanel(stage, taskService) {
        this._hasBeenShowed = false;
        this.backColor = 0xFFFAFA;
        this.panelX = dialoguePanelPosConfig.x;
        this.panelY = dialoguePanelPosConfig.y;
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
        this.panel = new egret.DisplayObjectContainer();
        this.taskNameTextField = new egret.TextField();
        this.taskDescTextField = new egret.TextField();
        this.backGround = new egret.Shape();
        this.button = new egret.DisplayObjectContainer();
        this.buttonBack = new egret.Shape();
        this.buttonTextField = new egret.TextField();
        this.drawPanel();
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    DialoguePanel.setDialoguePanel = function (panel) {
        this.dialoguePanel = panel;
    };
    DialoguePanel.getdialoguePanel = function () {
        return this.dialoguePanel;
    };
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
        this.panel.addChild(this.button);
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    p.onButtonClick = function (e) {
        console.log("按钮被点击");
        switch (this.currentTaskStatus) {
            case TaskStatus.ACCEOTABLE:
                console.log("Accept Button Click");
                console.log("Current Task Id: " + this.currentTaskId);
                this.taskService.accept(this.currentTaskId);
                break;
            case TaskStatus.CAN_SUBMIT:
                console.log("Submit Button Click");
                this.taskService.finish(this.currentTaskId);
                break;
            default:
                console.log("Button Click");
        }
        this.removePanel();
    }; //按钮被点击
    p.showPanel = function () {
        this._hasBeenShowed = true;
        this.stage.addChild(this.panel);
    };
    p.removePanel = function () {
        if (!this._hasBeenShowed) {
            console.log("对话框已经被关闭");
        }
        else {
            this._hasBeenShowed = false;
            this.stage.removeChild(this.panel);
            console.log("对话框关闭");
        }
        this.callback();
    };
    p.onOpen = function (task, callback) {
        this.callback = callback;
        this.currentTaskId = task.id;
        this.changeTaskText(task.name, task.desc);
        this.changeButton(task.status);
        this.currentTaskStatus = task.status;
        this.showPanel();
    }; //被通知
    p.onClose = function (callback) {
        this.callback = callback;
        this.removePanel();
        console.log("关闭对话框");
    }; //被通知
    p.changeTaskText = function (name, desc) {
        this.taskNameTextField.text = name;
        this.taskDescTextField.text = desc;
    };
    p.changeButton = function (taskStatus) {
        switch (taskStatus) {
            case TaskStatus.ACCEOTABLE:
                this.buttonTextField.text = "接受";
                break;
            case TaskStatus.CAN_SUBMIT:
                this.buttonTextField.text = "提交";
                break;
            default:
                this.buttonTextField.text = "";
                break;
        }
    };
    return DialoguePanel;
}());
egret.registerClass(DialoguePanel,'DialoguePanel');
//# sourceMappingURL=DialoguePanel.js.map