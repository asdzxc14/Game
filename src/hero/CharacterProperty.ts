class CharacterProperty extends Property{

	name:string = "";
	level:number = 1;

	_attackGrow:number = 0;
	_defenceGrow:number = 0;
	_strengthGrow:number = 0;
	_agilityGrow:number = 0;
	_intelligenceGrow:number = 0;
	_enduranceGrow:number = 0;

	desc:string = "";

	public constructor() {
		super();
	}

	public levelup():void {
		this.level++;
	}

	get _attack():number {
		return this.level * this._attackGrow;
	}

	get _defence():number {
		return this.level * this._defenceGrow;
	}

	get _strength():number {
		return this.level * this._strengthGrow;
	}

	get _agility():number {
		return this.level * this._agilityGrow;
	}

	get _intelligence():number {
		return this.level * this._intelligenceGrow;
	}

	get _endurance():number {
		return this.level * this._enduranceGrow;
	}

	get fightPower():number {

		var result = 0;

		result =  this._attack + this._defence + (this._strength + this._agility + 
									   this._intelligence + this._endurance) * 0.5;

		return result;

	}
}