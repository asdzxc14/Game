var equipmentType = {

	GEM:-1,
	WEAPON:0,
	SHIELD:1,

	HEAD:2,
	NECK:3,
	SHOULDER:4,
	BODY:5

}

class Equipment extends Item{
	
	uId:number;
	type:number;
	configId:string;
	property:EquipmentProperty;

	public constructor() {
		super();
	}

	get fightPower():number{
		return 0;
	};

	get attack():number {
		return 0;
	}

	get defence():number {
		return 0;
	}

	get strength():number {
		return 0; 
	};

	get agility():number {
		return 0;
	};

	get intelligence():number {
		return 0; 
	};

	get endurance():number {
		return 0;
	};

}