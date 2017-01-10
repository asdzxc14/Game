var monsterConfig = [
    { monsterId: "001", name: "monster1", x: 512, y: 256, bitMap: "player01_idle_down_png", hp: 5000, atk: 100, monsterFightPosX: 512, monsterFightPosY: 320 }
];
var Monster = (function () {
    function Monster(monsterId, service) {
        this.__hasBeenCancelled = false;
        this.fullProcess = 10;
        this.currentProcess = 0;
        this.scenceService = service;
        this.monster = new egret.Bitmap();
        var x;
        var y;
        for (var i = 0; i < monsterConfig.length; i++) {
            if (monsterConfig[i].monsterId == monsterId) {
                this.monsterId = monsterId;
                x = monsterConfig[i].x;
                y = monsterConfig[i].y;
                this.monster.texture = RES.getRes(monsterConfig[i].bitMap);
                this.setMonsterPos(monsterConfig[i].x, monsterConfig[i].y);
                this.monsterFightPosX = monsterConfig[i].monsterFightPosX;
                this.monsterFightPosY = monsterConfig[i].monsterFightPosY;
                this.currentHp = monsterConfig[i].hp;
                this.maxHp = monsterConfig[i].hp;
                this.atk = monsterConfig[i].atk;
            }
        }
    }
    var d = __define,c=Monster,p=c.prototype;
    p.refurbishMonster = function () {
        console.log("怪物刷新");
        this.currentHp = this.maxHp;
    };
    p.giveDamage = function () {
        return this.atk;
    };
    p.getDamage = function (damage) {
        console.log("怪物受伤害:" + damage);
        this.currentHp -= damage;
    };
    p.getHp = function () {
        return this.currentHp;
    };
    p.getMaxHp = function () {
        return this.maxHp;
    };
    p.setMonsterPos = function (x, y) {
        this.monster.x = x;
        this.monster.y = y;
    };
    Monster.setCurrentMonster = function (monster) {
        this._currrntMonster = monster;
    };
    Monster.getCurrentMonster = function () {
        return this._currrntMonster;
    };
    p.showMonster = function (stage) {
        stage.addChild(this.monster);
    };
    p.offShowMonster = function (stage) {
        stage.removeChild(this.monster);
    };
    return Monster;
}());
egret.registerClass(Monster,'Monster');
//# sourceMappingURL=Monster.js.map