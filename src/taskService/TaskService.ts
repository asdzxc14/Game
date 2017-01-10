var ErrorCode = {

	NO_ERRIR:0,
	ID_NOTFOUND:1
}



class TaskService implements EventEmitter{

	observerList:Observer[];
	taskList:Task[];

	task01:Task;

	public constructor(scenceService:SceneService) {
		this.observerList = new Array();
		this.taskList = new Array();
		this.task01 = new Task(this,scenceService,"000");
		this.taskList.push(this.task01);
	}

	addObserver(observer:Observer) {
		this.observerList.push(observer);
	}

	accept(id:string):number {
		for(var i = 0; i < this.taskList.length; i++) {
			if(this.taskList[i].id == id) {
				console.log("Find Task: " + this.taskList[i].id);
				this.taskList[i].status = TaskStatus.DURING;
				this.taskList[i].taskCondition.onAccept(this.taskList[i]);
				this.notify(this.taskList[i]);
				return ErrorCode.NO_ERRIR;

			}else if(i == this.taskList.length - 1) {
				return ErrorCode.ID_NOTFOUND;
			}
		}

	}

	
	finish(id:string):number {
		for(var i = 0; i < this.taskList.length; i++) {
			if(this.taskList[i].id == id) {
				this.taskList[i].status = TaskStatus.SUBMITTED;
				this.taskList[i].taskCondition.onSubmit(this.taskList[i]);
				this.notify(this.taskList[i]);
				return ErrorCode.NO_ERRIR;
				
			}else if(i == this.taskList.length - 1) {
				return ErrorCode.ID_NOTFOUND;
			}
		}
		
	}

	getTaskByCustomRole(rule:Function,Id:string):Task {
		return rule(this.taskList,Id);

	}

	notify(task:Task) {
		for(var i = 0; i < this.observerList.length; i++) {
				this.observerList[i].onChange(task);

		}
	}



}