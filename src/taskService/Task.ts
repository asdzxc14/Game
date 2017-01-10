var TaskStatus = {
	UNACCEPTABLE:0,
	ACCEOTABLE:1,
	DURING:2,
	CAN_SUBMIT:3,
	SUBMITTED:4
}

interface TaskConditionContext {

	taskCondition:KillMonsterTaskCondition;
	getcurrent():number;
	setcurrent(current:number);
	
}

class TaskCondition {

	onAccept(task:Task) {
		task.status = TaskStatus.DURING;
	}

	onSubmit(task:Task) {
		task.status = TaskStatus.SUBMITTED;
	}

}

class NPCTalkTaskCondition {
	
	
	onAccept(task:Task) {
		task.status = TaskStatus.DURING;

	}

	onSubmit(task:Task) {
		task.status = TaskStatus.SUBMITTED;

	}

}

class KillMonsterTaskCondition implements Observer {

	monsterId:string;
	status:number;
	context:TaskConditionContext;
	scenceService:SceneService;

	constructor(id:string,context:TaskConditionContext,scenceService:SceneService) {
		this.monsterId = id;
		this.context = context;
		this.status = TaskStatus.CAN_SUBMIT;
		this.scenceService = scenceService;
		this.scenceService.addObserver(this);

	}	

	onAccept(task:Task) {
		this.status = TaskStatus.DURING;

	}

	
	onSubmit(task:Task) {
		this.status = TaskStatus.SUBMITTED;

	}

	onChange(id:string){
		if(id == this.monsterId && this.status == TaskStatus.DURING){
			console.log(this.status);
			this.context.setcurrent(this.context.getcurrent() +1);
		}
	}

}


var taskConfig = [

	{Id:"000",name:"Task000",desc:"Go to NPC_2",fromNpcId:"npc_0",toNpcId:"npc_1",status:TaskStatus.ACCEOTABLE,current:0,total:10}

]

class Task implements TaskConditionContext{

	id:string;
	name:string;
	desc:string;
	status:number;
	fromNpcId:string;
	toNpcId:string;

	taskCondition:KillMonsterTaskCondition;

	current:number = 0;
	total:number = -1;

	taskService:TaskService;

	public constructor(taskService:TaskService,scenceService:SceneService,id:string) {
		
		for(var i=0;i<taskConfig.length;i++) {
			if(taskConfig[i].Id == id) {
				this.taskService = taskService;
				this.id = taskConfig[i].Id;
				this.name = taskConfig[i].name;
				this.desc = taskConfig[i].desc;
				this.status = taskConfig[i].status;
				this.fromNpcId = taskConfig[i].fromNpcId;
				this.toNpcId = taskConfig[i].toNpcId;
				this.current = taskConfig[i].current;
				this.total = taskConfig[i].total;
				this.taskCondition = new KillMonsterTaskCondition("001",this,scenceService);
				break;
				
			}else if(i == taskConfig.length - 1) {
				console.log("未找到该任务:" + id);
				break;
			}
		}
		
	}

	onAccept() {
		this.taskCondition.onAccept(this);

	}

	onsubmit() {
		this.taskCondition.onSubmit(this);
	}

	getcurrent() {
		return this.current;

	}

	setcurrent(current:number) {
		this.current = current;
		this.checkStatus();
	}

	checkStatus() {
		if(this.current >= this.total){
			this.current = this.total;
			this.status = TaskStatus.CAN_SUBMIT;
			console.log("Finish");
		}

		this.taskService.notify(this);

		console.log(this.status);

	}


}

