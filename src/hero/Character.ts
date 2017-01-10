var characterTypeConfig = {

	HERO:0

}

var CharacterStatusConfig = {

	NORMAL:0,
	DEAD:1

}

class Character extends Property{
	
	uId:number;
	type:number;
	configId:string;
	currentHp:number;
	currentMp:number;
	property:CharacterProperty;
	status:number = CharacterStatusConfig.NORMAL;
	
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