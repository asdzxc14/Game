var heroGrowConfig = [

	{id:"hero_0",name:"A",attack:12,defecce:12,strength:15,agility:12,intelligence:10,endurance:12,desc:"This is A"},
	{id:"hero_1",name:"B",attack:15,defecce:11,strength:10,agility:10,intelligence:40,endurance:7,desc:"This is A"}

]

class HeroProperty extends CharacterProperty{

	exp:number = 0;

	public constructor(configId:string){
		super();
		for(var i=0;i<heroGrowConfig.length;i++) {
			if(configId == heroGrowConfig[i].id){
				var hero = heroGrowConfig[i];
				this.name = hero.name;
				this._attackGrow = hero.attack;
				this._defenceGrow = hero.defecce;
				this._agilityGrow = hero.agility;
				this._strengthGrow = hero.strength;
				this._intelligenceGrow = hero.intelligence;
				this._enduranceGrow = hero.endurance;
				this.desc = hero.desc;
				break;

			}else if(i == (heroGrowConfig.length-1)) {
				console.warn("未找到英雄configId:"+ configId);
			}
		}
		
	}

	public levelup():void {
		this.level++;
	}

}