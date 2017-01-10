var CharacterProperty = (function (_super) {
    __extends(CharacterProperty, _super);
    function CharacterProperty() {
        _super.call(this);
        this.name = "";
        this.level = 1;
        this._attackGrow = 0;
        this._defenceGrow = 0;
        this._strengthGrow = 0;
        this._agilityGrow = 0;
        this._intelligenceGrow = 0;
        this._enduranceGrow = 0;
        this.desc = "";
    }
    var d = __define,c=CharacterProperty,p=c.prototype;
    p.levelup = function () {
        this.level++;
    };
    d(p, "_attack"
        ,function () {
            return this.level * this._attackGrow;
        }
    );
    d(p, "_defence"
        ,function () {
            return this.level * this._defenceGrow;
        }
    );
    d(p, "_strength"
        ,function () {
            return this.level * this._strengthGrow;
        }
    );
    d(p, "_agility"
        ,function () {
            return this.level * this._agilityGrow;
        }
    );
    d(p, "_intelligence"
        ,function () {
            return this.level * this._intelligenceGrow;
        }
    );
    d(p, "_endurance"
        ,function () {
            return this.level * this._enduranceGrow;
        }
    );
    d(p, "fightPower"
        ,function () {
            var result = 0;
            result = this._attack + this._defence + (this._strength + this._agility +
                this._intelligence + this._endurance) * 0.5;
            return result;
        }
    );
    return CharacterProperty;
}(Property));
egret.registerClass(CharacterProperty,'CharacterProperty');
//# sourceMappingURL=CharacterProperty.js.map