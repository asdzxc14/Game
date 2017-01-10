class Shield extends Equipment{

	type = equipmentType.SHIELD;
	property:ShieldProperty;
	gems:Gem[] = [];

	public constructor(configId:string) {
		super();
		this.configId = configId;
		this.property = new ShieldProperty(configId);

	}

	public addGem(gem:Gem):void {
		this.gems.push(gem);
	}

	get fightPower():number {
		var result:number = 0;
		this.gems.forEach(gem => {
			result += gem.fightPower;
		});
		result += this.property.fightPower;

		return result;
	}

	get attack():number {
		var result:number = 0;
		this.gems.forEach(gem => {
			result += gem.attack;
		});
		result += this.property._attack;

		return result;
	}

	get defence():number {
		var result:number = 0;
		this.gems.forEach(gem => {
			result += gem.defence;
		});
		result += this.property._defence;

		return result;
	}

	get strength():number {
		var result:number = 0;
		this.gems.forEach(gem => {
			result += gem.strength;
		});
		result += this.property._strength;

		return result;
	}

	get agility():number {
		var result:number = 0;
		this.gems.forEach(gem => {
			result += gem.agility;
		});
		result += this.property._agility;

		return result;
	}

	get intelligence():number {
		var result:number = 0;
		this.gems.forEach(gem => {
			result += gem.intelligence;
		});
		result += this.property._intelligence;

		return result;
	}

	get endurance():number {
		var result:number = 0;
		this.gems.forEach(gem => {
			result += gem.endurance;
		});
		result += this.property._endurance;

		return result;
	}
}