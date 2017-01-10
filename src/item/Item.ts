var uId = 0;
var itemList:Item[];

var itemStatusConfig = {

	INBAG:0,
	INUSE:1,


}

class Item {

	uId:number;
	type:number;
	configId:string;
	property:Property;
	status:number = itemStatusConfig.INBAG;

	public constructor() {
		this.uId = uId + 1;
		uId++;
	}

	public setItemStatus(status:number){
		this.status = status;
	}

}

