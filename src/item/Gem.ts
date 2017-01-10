class Gem extends Equipment{

	type:number = equipmentType.GEM;
	property:GemProperty;

	public constructor(configId:string) {
		super();//uId
		this.configId = configId;
		this.property = new GemProperty(configId);

	}

	get fightPower():number {

		var result = 0;

		result =  this.property.fightPower;

		return result;

	}

	get attack():number {
		return this.property._attack;
	}

	get defence():number {
		return this.property._defence;
	}
	
	get strength():number {
		return this.property._strength;
	}

	get agility():number {
		return this.property._agility;
	}

	get intelligence():number {
		return this.property._intelligence;
	}

	get endurance():number {
		return this.property._endurance;
	}

}