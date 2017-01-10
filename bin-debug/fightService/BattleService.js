var battleConfig = {
    WIN: 0,
    LOSE: 1
};
var BattleService = (function () {
    function BattleService(hero, monster) {
        this.__hasBeenCancelled = false;
        this.hero = hero;
        this.monster = monster;
        this.currentRound = 0;
    }
    var d = __define,c=BattleService,p=c.prototype;
    p.startBattle = function (callback) {
        this.callback = callback;
        console.log("开始战斗");
        egret.setTimeout(this.battleRound, this, 200);
    };
    p.stopBattle = function (callback) {
        this.callback = callback;
        console.log("取消战斗");
        this.__hasBeenCancelled = true;
    };
    p.battleCount = function () {
        if (this.__hasBeenCancelled) {
            this.cancalBattle();
        }
        else {
            console.log("玩家生命：" + this.hero.getHp() + "/" + this.hero.maxHp);
            console.log("怪物生命：" + this.monster.getHp() + "/" + this.monster.getMaxHp());
            if (this.hero.getHp() <= 0) {
                this.battleEnd(battleConfig.LOSE);
            }
            else if (this.monster.getHp() <= 0) {
                this.battleEnd(battleConfig.WIN);
            }
            else {
                egret.setTimeout(this.battleRound, this, 200);
            }
        }
    };
    p.battleRound = function () {
        this.currentRound++;
        console.log("第" + this.currentRound + "回合");
        this.monster.getDamage(this.hero.giveDamage());
        this.hero.getDamage(this.monster.giveDamage());
        this.battleCount();
    };
    p.battleEnd = function (info) {
        switch (info) {
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
    };
    p.cancalBattle = function () {
        console.log("战斗取消");
        this.__hasBeenCancelled = false;
        this.callback();
    };
    return BattleService;
}());
egret.registerClass(BattleService,'BattleService');
//# sourceMappingURL=BattleService.js.map