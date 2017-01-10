var weaponConfig = [

	{id:"weapon_0",name:"SmallSword",attack:100,defence:100,strength:110,agility:120,intelligence:130,endurance:140,desc:"This is SmallSword"},
	{id:"weapon_1",name:"BigSword",attack:200,defence:200,strength:210,agility:220,intelligence:230,endurance:240,desc:"This is BigSword"}

]

class WeaponProperty extends EquipmentProperty{

	public constructor(configId:string){
		super();
		for(var i=0;i<weaponConfig.length;i++){
			if(configId == weaponConfig[i].id){
				var weapon = weaponConfig[i];
				this.name = weapon.name
				this._attack = weapon.attack;
				this._defence = weapon.defence;
				this._strength = weapon.strength;
				this._agility = weapon.agility;
				this._intelligence = weapon.intelligence;
				this._endurance =weapon.endurance;
				this.desc = weapon.desc;
				break;

			}else if(i == (weaponConfig.length -1)){
				console.warn("未找到武器configId:"+ configId);
				break;
			}
		}

	}

	get fightPower():number {

		var result = 0;

		result =  this._attack + this._defence + (this._strength + this._agility + 
									   this._intelligence + this._endurance) * 0.5;

		return result;

	}
}