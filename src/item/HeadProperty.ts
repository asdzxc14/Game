var headConfig = [

	{id:"head_0",name:"BadHead",attack:100,defence:100,strength:110,agility:120,intelligence:130,endurance:140,desc:"This is BadHead"},
	{id:"head_1",name:"GoodHead",attack:200,defence:200,strength:210,agility:220,intelligence:230,endurance:240,desc:"This is GoodHead"}

]

class HeadProperty extends EquipmentProperty{

	public constructor(configId:string){
		super();
		for(var i=0;i<headConfig.length;i++){
			if(configId == headConfig[i].id){
				var head = headConfig[i];
				this.name = head.name;
				this._attack = head.attack;
				this._defence = head.defence;
				this._strength = head.strength;
				this._agility = head.agility;
				this._intelligence = head.intelligence;
				this._endurance =head.endurance;
				this.desc = head.desc;
				break;

			}else if(i == (headConfig.length -1)){
				console.warn("未找到头部装备configId:"+ configId);
				break;
			}
		}

	}

	get fightPower():number {

		var result = 0;

		result =  this._attack + this._defence+ (this._agility + this._strength + 
									   this._intelligence + this._endurance) * 0.5;

		return result;

	}
}