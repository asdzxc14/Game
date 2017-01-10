var battleConfig = {

	WIN:0,
	LOSE:1

}

class BattleService {

	currentRound:number;
	__hasBeenCancelled:boolean = false;
	hero:Hero;
	monster:Monster;

	callback:Function;

	public constructor(hero:Hero,monster:Monster) {
		this.hero = hero;
		this.monster = monster;
		this.currentRound = 0;
	}

	public startBattle(callback:Function){
		this.callback = callback;
		console.log("开始战斗");
		egret.setTimeout(this.battleRound,this,200);
	}

	public stopBattle(callback:Function) {
		this.callback = callback;
		console.log("取消战斗");
		this.__hasBeenCancelled = true;
	}

	public battleCount(){
		if(this.__hasBeenCancelled){
			this.cancalBattle();

		}else {

			console.log("玩家生命：" + this.hero.getHp() + "/" + this.hero.maxHp);
			console.log("怪物生命：" + this.monster.getHp() + "/" + this.monster.getMaxHp());

			if(this.hero.getHp() <= 0){
				this.battleEnd(battleConfig.LOSE);

			}else if(this.monster.getHp() <= 0) {
				this.battleEnd(battleConfig.WIN);

			}else {
				egret.setTimeout(this.battleRound,this,200);
			}
		}
	}

	public battleRound(){
		this.currentRound++;
		console.log("第"+ this.currentRound + "回合");
		this.monster.getDamage(this.hero.giveDamage());
		this.hero.getDamage(this.monster.giveDamage());
		this.battleCount();

	}

	public battleEnd(info:number) {
		switch(info){
			case battleConfig.WIN:
				console.log("战斗胜利");
				this.monster.scenceService.notify(this.monster.monsterId);
				this.monster.refurbishMonster();
				this.callback();
				break;

			case battleConfig.LOSE:
				console.log("战斗失败");
				console.log("重新开始");
				this.hero.reviveHero();
				this.callback();
				break;
		}
	}

	public cancalBattle() {
		console.log("战斗取消");
		this.__hasBeenCancelled = false;
		this.callback();
	}


}