var equipmentType = {
    GEM: -1,
    WEAPON: 0,
    SHIELD: 1,
    HEAD: 2,
    NECK: 3,
    SHOULDER: 4,
    BODY: 5
};
var Equipment = (function (_super) {
    __extends(Equipment, _super);
    function Equipment() {
        _super.call(this);
    }
    var d = __define,c=Equipment,p=c.prototype;
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
    return Equipment;
}(Item));
egret.registerClass(Equipment,'Equipment');
//# sourceMappingURL=Equipment.js.map