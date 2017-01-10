var dialoguePanelPosConfig = {
	x:450,y:700
}

class DialoguePanel {

	callback:Function;

	_hasBeenShowed:boolean = false;

	public static dialoguePanel:DialoguePanel;

	panel:egret.DisplayObjectContainer;

	stage:egret.DisplayObjectContainer;

	private taskService:TaskService;
	private npc:NPC;
	private currentTaskId:string;
	private currentTaskStatus:number;

	private backColor = 0xFFFAFA;
	private backGround:egret.Shape;
	private panelX = dialoguePanelPosConfig.x;
	private panelY = dialoguePanelPosConfig.y;
	private panelWidth = 200;
	private panelHeight = 300;

	private taskNameTextField:egret.TextField;
	private taskNameTextFieldText = "Task";
	private taskNameTextFieldX = 40;
	private taskNameTextFieldY = 30;
	private taskNameTextFieldWidth = 200;
	private taskNameTextFieldColor = 0xFF0000;

	private taskDescTextField:egret.TextField;
	private taskDescTextFieldText = "Task";
	private taskDescTextFieldX = 10;
	private taskDescTextFieldY = 100;
	private taskDescTextFieldWidth = 180;
	private taskDescTextFieldColor = 0xFF0000;
	
	private button:egret.DisplayObjectContainer;
	private buttonBack:egret.Shape;
	private buttonColor = 0x808000;
	private buttonX = 50;
	private buttonY = 200;
	private buttonWidth = 100;
	private buttonHeight = 50;

	private buttonTextField:egret.TextField;
	private buttonTextFieldText = "确认";
	private buttonTextFieldX = this.buttonX + 15;
	private buttonTextFieldY = this.buttonY + 10;
	private buttonTextFieldWidth = 100;
	private buttonTextFieldColor = 0xFFFAFA;

	public static setDialoguePanel(panel:DialoguePanel) {
		this.dialoguePanel = panel;
	}

	public static getdialoguePanel():DialoguePanel{
		return this.dialoguePanel;
	}

	public constructor(stage:egret.DisplayObjectContainer,taskService:TaskService) {
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

	private setText(){
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


	}

	private drawBackGround() {
		this.backGround.graphics.beginFill(this.backColor,1);
		this.backGround.graphics.drawRect(0,0,this.panelWidth,this.panelHeight);
		this.backGround.graphics.endFill();

	}

	private drawButtonBack() {
		this.buttonBack.graphics.beginFill(this.buttonColor,1);
		this.buttonBack.graphics.drawRect(this.buttonX,this.buttonY,this.buttonWidth,this.buttonHeight);
		this.buttonBack.graphics.endFill();

	}

	private setButtonText() {
		this.buttonTextField.text = this.buttonTextFieldText;
		this.buttonTextField.x = this.buttonTextFieldX;
		this.buttonTextField.y = this.buttonTextFieldY;
		this.buttonTextField.width = this.buttonTextFieldWidth;
		this.buttonTextField.bold = false;
		this.buttonTextField.textColor = this.buttonTextFieldColor;

	}

	private drawButton() {
		this.drawButtonBack();
		this.setButtonText();
		this.button.addChild(this.buttonBack);
		this.button.addChild(this.buttonTextField);
	}

	public drawPanel() {
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
		this.button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this);

	}

	private onButtonClick(e:egret.TouchEvent) {
		console.log("按钮被点击");
		switch(this.currentTaskStatus){
			case TaskStatus.ACCEOTABLE:
				console.log("Accept Button Click");
				console.log("Current Task Id: "+ this.currentTaskId);
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

	} //按钮被点击


	private showPanel() {
		this._hasBeenShowed = true;
		this.stage.addChild(this.panel);
	}

	private removePanel() {
		if(!this._hasBeenShowed){
			console.log("对话框已经被关闭");
		}else {
			this._hasBeenShowed = false;
			this.stage.removeChild(this.panel);
			console.log("对话框关闭");
			
		}
		this.callback();
	}

	public onOpen(task:Task,callback:Function) {
		this.callback = callback;
		this.currentTaskId = task.id;
		this.changeTaskText(task.name,task.desc);
		this.changeButton(task.status);
		this.currentTaskStatus = task.status;
		this.showPanel();

	} //被通知

	public onClose(callback:Function) {
		this.callback = callback;
		this.removePanel();
		console.log("关闭对话框");

	} //被通知

	private changeTaskText(name:string,desc:string) {
		this.taskNameTextField.text = name;
		this.taskDescTextField.text = desc;

	}

	private changeButton(taskStatus:number) {
		switch(taskStatus){
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

	}
}