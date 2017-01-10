var monsterConfig = [

	{monsterId:"001",name:"monster1",x:512,y:256,bitMap:"player01_idle_down_png",hp:5000,atk:100,monsterFightPosX:512,monsterFightPosY:320}

]

class Monster {

	public static _currrntMonster:Monster;
	callback:Function;
	__hasBeenCancelled:boolean = false;
	fullProcess:number = 10;
	currentProcess:number = 0;
	scenceService:SceneService;
	monster:egret.Bitmap;
	monsterId:string;
	monsterFightPosX:number;
	monsterFightPosY:number;
	maxHp:number;
	currentHp:number;
	atk:number;

	public constructor(monsterId:string,service:SceneService) {
		this.scenceService = service;
		this.monster = new egret.Bitmap();
		var x:number;
		var y:number;

		for(var i=0;i<monsterConfig.length;i++) {
			if(monsterConfig[i].monsterId == monsterId) {
				this.monsterId = monsterId;
				x = monsterConfig[i].x;
				y = monsterConfig[i].y;
				this.monster.texture = RES.getRes(monsterConfig[i].bitMap);
				this.setMonsterPos(monsterConfig[i].x,monsterConfig[i].y);
				this.monsterFightPosX = monsterConfig[i].monsterFightPosX;
				this.monsterFightPosY = monsterConfig[i].monsterFightPosY;

				this.currentHp = monsterConfig[i].hp;
				this.maxHp = monsterConfig[i].hp;
				this.atk = monsterConfig[i].atk;

			}
		}

	}

	public refurbishMonster() {
		console.log("怪物刷新");
		this.currentHp = this.maxHp;
	}

	public giveDamage():number {
		return this.atk;
	}

	public getDamage(damage:number) {
		console.log("怪物受伤害:"+ damage);
		this.currentHp -= damage;
	}

	public getHp():number {
		return this.currentHp;
	}

	public getMaxHp():number {
		return this.maxHp;
	}

	public setMonsterPos(x:number,y:number) {
		this.monster.x = x;
		this.monster.y = y;
	}

	public static setCurrentMonster(monster:Monster) {
		this._currrntMonster = monster;
	}

	public static getCurrentMonster():Monster {
		return this._currrntMonster;
	}	

	public showMonster(stage:egret.DisplayObjectContainer) {
		stage.addChild(this.monster);

	}

	public offShowMonster(stage:egret.DisplayObjectContainer) {
		stage.removeChild(this.monster);
		
	}

}