var npcConfig = [

	{npcId:"npc_0",name:"NPC_1",x:256,y:448,bitmap:"player01_idle_left_png",talkPosX:192,talkPosY:512},
	{npcId:"npc_1",name:"NPC_2",x:448,y:64,bitmap:"player01_idle_right_png",talkPosX:512,talkPosY:128}

]

class NPC implements Observer{

	public static _currentNpc:NPC;

	public npcStage:egret.DisplayObjectContainer;

	taskService:TaskService;

	dialoguePanel:DialoguePanel;

	task:Task;

	npcId:string;
	npcName:string;
	npcBitmap:string;
	talkPosX:number;
	talkPosY:number;

	emoji:egret.Bitmap;
	tileSize:number = 64;
	emojiX:number = 0;
	emojiY:number = 64;

	npcStageShape:egret.Shape;
	npcStageX :number;
	npcStageY :number;
	npcStageWidth = 64;
	npcStageHeight = 128;

	taskNoneState:State;
	taskAvilableState:State;
	taskSubmitState:State;
	taskStateMachine:StateMachine;

	public constructor(npcId:string,taskService,dialoguePanel:DialoguePanel) {
		this.npcStage = new egret.DisplayObjectContainer();
		this.npcStageShape = new egret.Shape();
		this.emoji = new egret.Bitmap();
		for(var i=0;i<npcConfig.length;i++) {
			if(npcId == npcConfig[i].npcId) {
				this.npcId = npcConfig[i].npcId;
				this.npcName = npcConfig[i].name;
				this.npcBitmap = npcConfig[i].bitmap; 
				this.setNpc(npcConfig[i].x,npcConfig[i].y);
				this.talkPosX = npcConfig[i].talkPosX;
				this.talkPosY = npcConfig[i].talkPosY;
			}
		}
		
		this.taskService= taskService;
		this.taskService.addObserver(this);

		this.taskNoneState = new TaskNoneState(this);
		this.taskAvilableState = new TaskAvilableState(this);
		this.taskSubmitState = new TaskSubmitState(this);

		this.taskStateMachine = new StateMachine(this.taskNoneState);
		this.dialoguePanel = dialoguePanel;
		this.getTask();
		this.drawNpc();

	}

	public showNpc(stage:egret.DisplayObjectContainer) {
		stage.addChild(this.npcStage);
	}

	public static setCurrentNpc(npc:NPC){
		this._currentNpc = npc;
	}

	public static getCurrentNpc(){
		return this._currentNpc;
	}

	getTask() {
		this.task = this.taskService.getTaskByCustomRole(this.rule,this.npcId);
		console.log("This Task State: "+ this.task.status);
		this.checkState();
	}

	setemoji() {
		
		this.emoji.texture = RES.getRes(this.npcBitmap);
		this.emoji.x = this.emojiX;
		this.emoji.y = this.emojiY;
		this.emoji.width= this.tileSize;
		this.emoji.height = this.tileSize;
	}

	setNpc(npcX:number,npcY:number){
		this.npcStageX = npcX;
		this.npcStageY = npcY;
		this.setemoji();
	}

	drawNpc() {
		this.npcStage.x = this.npcStageX;
		this.npcStage.y = this.npcStageY;
		this.npcStage.width = this.npcStageWidth;
		this.npcStage.height = this.npcStageHeight;

		this.npcStage.addChild(this.npcStageShape);
		this.npcStage.addChild(this.emoji);
		this.emoji.touchEnabled = true;

	}

	checkState() {
		switch(this.task.status) {
			case TaskStatus.UNACCEPTABLE:
			case TaskStatus.DURING:
			case TaskStatus.SUBMITTED:
				this.taskStateMachine.changeState(this.taskNoneState);
				break;

			case TaskStatus.ACCEOTABLE:
				if(this.task.fromNpcId == this.npcId) {
					this.taskStateMachine.changeState(this.taskAvilableState);
				}else {
					this.taskStateMachine.changeState(this.taskNoneState);
				}
				break;

			case TaskStatus.CAN_SUBMIT:
				if(this.task.toNpcId == this.npcId) {
					this.taskStateMachine.changeState(this.taskSubmitState);
				}else {
					this.taskStateMachine.changeState(this.taskNoneState);
				}
				break;

		}

	}

	onChange(task:Task) {
		this.task = task;
		this.checkState();
	}

	rule(taskList:Task[],npcId:string):Task {
		for(var i = 0; i<taskList.length; i++) {
			if(taskList[i].fromNpcId == npcId || taskList[i].toNpcId == npcId) {
				console.log("Find");
				return taskList[i];

			}
		}
	}

	public talkToNpc(callback:Function) {
		if(this.task.status == TaskStatus.ACCEOTABLE && this.task.fromNpcId == this.npcId){
			this.dialoguePanel.onOpen(this.task,callback);

		}else if(this.task.status == TaskStatus.CAN_SUBMIT && this.task.toNpcId == this.npcId) {
			this.dialoguePanel.onOpen(this.task,callback);
		}
	}

	public stopTalkToNpc(callback:Function) {
		this.dialoguePanel.onClose(callback);
	}

}

