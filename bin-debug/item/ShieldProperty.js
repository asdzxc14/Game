var shieldConfig = [
    { id: "shield_0", name: "SmallShield", attack: 100, defence: 100, strength: 110, agility: 120, intelligence: 130, endurance: 140, desc: "This is SmallShield" },
    { id: "shield_1", name: "BigShield", attack: 200, defence: 200, strength: 210, agility: 220, intelligence: 230, endurance: 240, desc: "This is BigShield" }
];
var ShieldProperty = (function (_super) {
    __extends(ShieldProperty, _super);
    function ShieldProperty(configId) {
        _super.call(this);
        for (var i = 0; i < shieldConfig.length; i++) {
            if (configId == shieldConfig[i].id) {
                var shield = shieldConfig[i];
                this.name = shield.name;
                this._attack = shield.attack;
                this._endurance = shield.defence;
                this._strength = shield.strength;
                this._agility = shield.agility;
                this._intelligence = shield.intelligence;
                this._endurance = shield.endurance;
                this.desc = shield.desc;
                break;
            }
            else if (i == (shieldConfig.length - 1)) {
                console.warn("未找到盾牌configId:" + configId);
                break;
            }
        }
    }
    var d = __define,c=ShieldProperty,p=c.prototype;
    d(p, "fightPower"
        ,function () {
            var result = 0;
            result = this._attack + this._defence + (this._strength + this._agility +
                this._intelligence + this._endurance) * 0.5;
            return result;
        }
    );
    return ShieldProperty;
}(EquipmentProperty));
egret.registerClass(ShieldProperty,'ShieldProperty');
//# sourceMappingURL=ShieldProperty.js.map