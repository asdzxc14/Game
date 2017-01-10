var Head = (function (_super) {
    __extends(Head, _super);
    function Head(configId) {
        _super.call(this);
        this.type = equipmentType.HEAD;
        this.gems = [];
        this.configId = configId;
        this.property = new HeadProperty(configId);
    }
    var d = __define,c=Head,p=c.prototype;
    p.addGem = function (gem) {
        this.gems.push(gem);
    };
    d(p, "fightPower"
        ,function () {
            var result = 0;
            this.gems.forEach(function (gem) {
                result += gem.fightPower;
            });
            result += this.property.fightPower;
            return result;
        }
    );
    d(p, "attack"
        ,function () {
            var result = 0;
            this.gems.forEach(function (gem) {
                result += gem.attack;
            });
            result += this.property._attack;
            return result;
        }
    );
    d(p, "defence"
        ,function () {
            var result = 0;
            this.gems.forEach(function (gem) {
                result += gem.defence;
            });
            result += this.property._defence;
            return result;
        }
    );
    d(p, "strength"
        ,function () {
            var result = 0;
            this.gems.forEach(function (gem) {
                result += gem.strength;
            });
            result += this.property._strength;
            return result;
        }
    );
    d(p, "agility"
        ,function () {
            var result = 0;
            this.gems.forEach(function (gem) {
                result += gem.agility;
            });
            result += this.property._agility;
            return result;
        }
    );
    d(p, "intelligence"
        ,function () {
            var result = 0;
            this.gems.forEach(function (gem) {
                result += gem.intelligence;
            });
            result += this.property._intelligence;
            return result;
        }
    );
    d(p, "endurance"
        ,function () {
            var result = 0;
            this.gems.forEach(function (gem) {
                result += gem.endurance;
            });
            result += this.property._endurance;
            return result;
        }
    );
    return Head;
}(Equipment));
egret.registerClass(Head,'Head');
//# sourceMappingURL=Head.js.map