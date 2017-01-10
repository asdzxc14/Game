class SceneService implements EventEmitter{
	
	observerList:Observer[];
	
	public constructor() {

		this.observerList = new Array();		
	}

	addObserver(observer:Observer) {
		this.observerList.push(observer);

	}

	notify(monsterId:string) {
		for(var i = 0; i < this.observerList.length; i++){
			this.observerList[i].onChange(monsterId);
		}
		
	}

}