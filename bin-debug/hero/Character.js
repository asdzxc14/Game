var characterTypeConfig = {
    HERO: 0
};
var CharacterStatusConfig = {
    NORMAL: 0,
    DEAD: 1
};
var Character = (function (_super) {
    __extends(Character, _super);
    function Character() {
        _super.call(this);
        this.status = CharacterStatusConfig.NORMAL;
    }
    var d = __define,c=Character,p=c.prototype;
    d(p, "fightPower"
        ,function () {
            return 0;
        }
    );
    ;
    d(p, "attack"
        ,function () {
            return 0;
        }
    );
    d(p, "defence"
        ,function () {
            return 0;
        }
    );
    d(p, "strength"
        ,function () {
            return 0;
        }
    );
    ;
    d(p, "agility"
        ,function () {
            return 0;
        }
    );
    ;
    d(p, "intelligence"
        ,function () {
            return 0;
        }
    );
    ;
    d(p, "endurance"
        ,function () {
            return 0;
        }
    );
    ;
    return Character;
}(Property));
egret.registerClass(Character,'Character');
//# sourceMappingURL=Character.js.map