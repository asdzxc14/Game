var Gem = (function (_super) {
    __extends(Gem, _super);
    function Gem(configId) {
        _super.call(this); //uId
        this.type = equipmentType.GEM;
        this.configId = configId;
        this.property = new GemProperty(configId);
    }
    var d = __define,c=Gem,p=c.prototype;
    d(p, "fightPower"
        ,function () {
            var result = 0;
            result = this.property.fightPower;
            return result;
        }
    );
    d(p, "attack"
        ,function () {
            return this.property._attack;
        }
    );
    d(p, "defence"
        ,function () {
            return this.property._defence;
        }
    );
    d(p, "strength"
        ,function () {
            return this.property._strength;
        }
    );
    d(p, "agility"
        ,function () {
            return this.property._agility;
        }
    );
    d(p, "intelligence"
        ,function () {
            return this.property._intelligence;
        }
    );
    d(p, "endurance"
        ,function () {
            return this.property._endurance;
        }
    );
    return Gem;
}(Equipment));
egret.registerClass(Gem,'Gem');
//# sourceMappingURL=Gem.js.map