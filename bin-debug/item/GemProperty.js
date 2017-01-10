var gemConfig = [
    { id: "gem_0", name: "Gem0", attack: 10, defence: 10, strength: 10, agility: 10, intelligence: 10, endurance: 10, desc: "This is Gem0" },
    { id: "gem_1", name: "Gem1", attack: 20, defence: 20, strength: 20, agility: 20, intelligence: 20, endurance: 20, desc: "This is Gem1" },
    { id: "gem_2", name: "Gem2", attack: 30, defence: 30, strength: 30, agility: 30, intelligence: 30, endurance: 30, desc: "This is Gem2" }
];
var GemProperty = (function (_super) {
    __extends(GemProperty, _super);
    function GemProperty(configId) {
        _super.call(this);
        for (var i = 0; i < gemConfig.length; i++) {
            if (configId == gemConfig[i].id) {
                var gem = gemConfig[i];
                this.name = gem.name;
                this._attack = gem.attack;
                this._defence = gem.defence;
                this._strength = gem.strength;
                this._agility = gem.agility;
                this._intelligence = gem.intelligence;
                this._endurance = gem.endurance;
                this.desc = gem.desc;
                break;
            }
            else if (i == (gemConfig.length - 1)) {
                console.warn("未找到宝石configId:" + configId);
                break;
            }
        }
    }
    var d = __define,c=GemProperty,p=c.prototype;
    d(p, "fightPower"
        ,function () {
            var result = 0;
            result = this._attack + this._defence + (this._strength + this._agility +
                this._intelligence + this._intelligence) * 0.5;
            return result;
        }
    );
    return GemProperty;
}(EquipmentProperty));
egret.registerClass(GemProperty,'GemProperty');
//# sourceMappingURL=GemProperty.js.map