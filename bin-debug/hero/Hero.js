var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(configId) {
        _super.call(this);
        this.type = characterTypeConfig.HERO;
        this.isInTeam = false;
        this.equipments = [];
        this.configId = configId;
        this.property = new HeroProperty(configId);
        this.reSetCurrentHMp();
    }
    var d = __define,c=Hero,p=c.prototype;
    p.reSetCurrentHMp = function () {
        this.currentHp = this.maxHp;
        this.currentMp = this.maxMp;
    };
    p.reviveHero = function () {
        console.log("玩家复活");
        this.reSetCurrentHMp();
    };
    p.giveDamage = function () {
        return this.attack;
    };
    p.getDamage = function (damage) {
        console.log("英雄受伤害:" + damage);
        this.currentHp -= damage;
    };
    p.getHp = function () {
        return this.currentHp;
    };
    p.getMp = function () {
        return this.currentMp;
    };
    p.levelUp = function () {
        this.property.levelup;
        this.reSetCurrentHMp();
    };
    p.setInTeam = function (status) {
        this.isInTeam = status;
    };
    p.equip = function (equipment) {
        this.equipments.push(equipment);
    };
    d(p, "fightPower"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (equipment) {
                result += equipment.fightPower;
            });
            result += this.property.fightPower;
            return result;
        }
    );
    d(p, "attack"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (equipment) {
                result += equipment.attack;
            });
            result += this.property._attack;
            return result;
        }
    );
    d(p, "strength"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (equipment) {
                result += equipment.strength;
            });
            result += this.property._strength;
            return result;
        }
    );
    d(p, "agility"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (equipment) {
                result += equipment.agility;
            });
            result += this.property._agility;
            return result;
        }
    );
    d(p, "intelligence"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (equipment) {
                result += equipment.intelligence;
            });
            result += this.property._intelligence;
            return result;
        }
    );
    d(p, "endurance"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (equipment) {
                result += equipment.endurance;
            });
            result += this.property._endurance;
            return result;
        }
    );
    d(p, "maxHp"
        ,function () {
            return this.endurance * 50;
        }
    );
    d(p, "maxMp"
        ,function () {
            return this.intelligence * 40;
        }
    );
    return Hero;
}(Character));
egret.registerClass(Hero,'Hero');
//# sourceMappingURL=Hero.js.map