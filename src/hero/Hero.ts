class Hero extends Character{

	currentHp:number;
	currentMp:number;

	type = characterTypeConfig.HERO;
	property:HeroProperty;
	isInTeam:boolean = false;
	equipments:Equipment[] = [];
    
	public constructor(configId:string) {
		super();
		this.configId = configId;
		this.property = new HeroProperty(configId);
		this.reSetCurrentHMp();
	}

	public reSetCurrentHMp(){
		this.currentHp = this.maxHp;
		this.currentMp = this.maxMp;
	}

	public reviveHero(){
		console.log("玩家复活");
		this.reSetCurrentHMp();
	}

	public giveDamage():number {
		return this.attack;
	}

	public getDamage(damage:number) {
		console.log("英雄受伤害:"+ damage);
		this.currentHp -= damage;
	}

	public getHp():number {
		return this.currentHp;
	}

	public getMp():number {
		return this.currentMp;
	}

	public levelUp() {
		this.property.levelup;
		this.reSetCurrentHMp();
	}

	public setInTeam(status:boolean):void {
		this.isInTeam = status;
	}

	public equip(equipment:Equipment):void {
		this.equipments.push(equipment);
	}

	get fightPower():number {
		var result:number = 0;
		this.equipments.forEach(equipment => {
			result += equipment.fightPower;
		});
		result += this.property.fightPower;

		return result;
	}

	get attack():number {
		var result:number = 0;
		this.equipments.forEach(equipment => {
			result += equipment.attack;
		});
		result += this.property._attack;

		return result;
	}

	get strength():number {
		var result:number = 0;
		this.equipments.forEach(equipment => {
			result += equipment.strength;
		});
		result += this.property._strength;

		return result;
	}

	get agility():number {
		var result:number = 0;
		this.equipments.forEach(equipment => {
			result += equipment.agility;
		});
		result += this.property._agility;

		return result;
	}

	get intelligence():number {
		var result:number = 0;
		this.equipments.forEach(equipment => {
			result += equipment.intelligence;
		});
		result += this.property._intelligence;

		return result;
	}

	get endurance():number {
		var result:number = 0;
		this.equipments.forEach(equipment => {
			result += equipment.endurance;
		});
		result += this.property._endurance;

		return result;
	}

	get maxHp():number {
		return this.endurance * 50;
	}

	get maxMp():number {
		return this.intelligence * 40;
	}

}