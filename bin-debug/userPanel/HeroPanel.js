var HeroBackMapConfig = [
    { image: "hero_png", x: 0, y: 0 }
];
var heroMapConfig = [
    { id: "h0", image: "hero_png" },
    { id: "h1", image: "hero_png" },
];
var equipmentBackMapConfig = [
    { type: equipmentType.WEAPON, image: "backMap_png", x: 0, y: 0 },
    { type: equipmentType.SHIELD, image: "backMap_png", x: 0, y: 100 },
    { type: equipmentType.HEAD, image: "backMap_png", x: 0, y: 200 },
    { type: equipmentType.NECK, image: "backMap_png", x: 0, y: 300 },
    { type: equipmentType.SHOULDER, image: "backMap_png", x: 0, y: 400 },
    { type: equipmentType.BODY, image: "backMap_png", x: 0, y: 500 }
];
var equipmentMapConfig = [
    { configId: "weapon_0", image: "weapon_png" },
    { configId: "shield_0", image: "shield_png" },
    { configId: "head_0", image: "head_png" }
];
var EquipmentMap = (function () {
    function EquipmentMap(stage) {
        this.head = new egret.Bitmap();
        this.neck = new egret.Bitmap();
        this.shoulder = new egret.Bitmap();
        this.body = new egret.Bitmap();
        this.weapon = new egret.Bitmap();
        this.shield = new egret.Bitmap();
        this.setBackMap();
        stage.addChild(this.head);
        stage.addChild(this.neck);
        stage.addChild(this.shoulder);
        stage.addChild(this.body);
        stage.addChild(this.weapon);
        stage.addChild(this.shield);
    }
    var d = __define,c=EquipmentMap,p=c.prototype;
    p.setBackMap = function () {
        this.weapon.texture = RES.getRes(equipmentBackMapConfig[equipmentType.WEAPON].image);
        this.weapon.x = equipmentBackMapConfig[equipmentType.WEAPON].x;
        this.weapon.y = equipmentBackMapConfig[equipmentType.WEAPON].y;
        this.shield.texture = RES.getRes(equipmentBackMapConfig[equipmentType.SHIELD].image);
        this.shield.x = equipmentBackMapConfig[equipmentType.SHIELD].x;
        this.shield.y = equipmentBackMapConfig[equipmentType.SHIELD].y;
        this.head.texture = RES.getRes(equipmentBackMapConfig[equipmentType.HEAD].image);
        this.head.x = equipmentBackMapConfig[equipmentType.HEAD].x;
        this.head.y = equipmentBackMapConfig[equipmentType.HEAD].y;
        this.neck.texture = RES.getRes(equipmentBackMapConfig[equipmentType.NECK].image);
        this.neck.x = equipmentBackMapConfig[equipmentType.NECK].x;
        this.neck.y = equipmentBackMapConfig[equipmentType.NECK].y;
        this.shoulder.texture = RES.getRes(equipmentBackMapConfig[equipmentType.SHOULDER].image);
        this.shoulder.x = equipmentBackMapConfig[equipmentType.SHOULDER].x;
        this.shoulder.y = equipmentBackMapConfig[equipmentType.SHOULDER].y;
        this.body.texture = RES.getRes(equipmentBackMapConfig[equipmentType.BODY].image);
        this.body.x = equipmentBackMapConfig[equipmentType.BODY].x;
        this.body.y = equipmentBackMapConfig[equipmentType.BODY].y;
    };
    p.equip = function (equipment) {
        var image; //equipment.property.configId
        for (var i = 0; i < equipmentMapConfig.length; i++) {
            if (equipmentMapConfig[i].configId == equipment.configId) {
                image = equipmentMapConfig[i].image;
                break;
            }
        }
        switch (equipment.type) {
            case equipmentType.HEAD:
                this.head.texture = RES.getRes(image);
                break;
            case equipmentType.NECK:
                this.neck.texture = RES.getRes(image);
                break;
            case equipmentType.SHOULDER:
                this.shoulder.texture = RES.getRes(image);
                break;
            case equipmentType.BODY:
                this.body.texture = RES.getRes(image);
                break;
            case equipmentType.WEAPON:
                this.weapon.texture = RES.getRes(image);
                break;
            case equipmentType.SHIELD:
                this.shield.texture = RES.getRes(image);
                break;
            default:
                console.log("fail");
        }
    };
    return EquipmentMap;
}());
egret.registerClass(EquipmentMap,'EquipmentMap');
var HeroMap = (function () {
    function HeroMap(stage) {
        this.hero = new egret.Bitmap();
        this.setBackMap();
        stage.addChild(this.hero);
    }
    var d = __define,c=HeroMap,p=c.prototype;
    p.setBackMap = function () {
        this.hero.texture = RES.getRes(HeroBackMapConfig[0].image);
        this.hero.x = HeroBackMapConfig[0].x;
        this.hero.y = HeroBackMapConfig[0].y;
    };
    return HeroMap;
}());
egret.registerClass(HeroMap,'HeroMap');
var heroTextConfig = [
    { name: "  name:  ", x: 0, y: 50 },
    { name: "  attack:  ", x: 0, y: 100 },
    { name: "  strength:  ", x: 0, y: 150 },
    { name: "  agility:  ", x: 0, y: 200 },
    { name: "  intelligence:  ", x: 0, y: 250 },
    { name: "  endurance:  ", x: 0, y: 300 },
    { name: "  fightPower:  ", x: 0, y: 350 },
    { name: "  MAXHP:  ", x: 200, y: 50 },
    { name: "  MAXMP:  ", x: 200, y: 100 },
    { name: "  HP:  ", x: 200, y: 150 },
    { name: "  MP:  ", x: 200, y: 200 }
];
var HeroInfoPanel = (function (_super) {
    __extends(HeroInfoPanel, _super);
    function HeroInfoPanel() {
        _super.call(this);
        this.backpanel = new Panel(0, 0, 448, 448);
        this.addChild(this.backpanel);
        this.init();
    }
    var d = __define,c=HeroInfoPanel,p=c.prototype;
    p.init = function () {
        this.name_Texfield = new egret.TextField();
        this.name_Texfield.text = heroTextConfig[0].name;
        this.name_Texfield.x = heroTextConfig[0].x;
        this.name_Texfield.y = heroTextConfig[0].y;
        this.addChild(this.name_Texfield);
        this.attack_Textfield = new egret.TextField();
        this.attack_Textfield.text = heroTextConfig[1].name;
        this.attack_Textfield.x = heroTextConfig[1].x;
        this.attack_Textfield.y = heroTextConfig[1].y;
        this.addChild(this.attack_Textfield);
        this.strength_Textfield = new egret.TextField();
        this.strength_Textfield.text = heroTextConfig[2].name;
        this.strength_Textfield.x = heroTextConfig[2].x;
        this.strength_Textfield.y = heroTextConfig[2].y;
        this.addChild(this.strength_Textfield);
        this.agility_Textfield = new egret.TextField();
        this.agility_Textfield.text = heroTextConfig[3].name;
        this.agility_Textfield.x = heroTextConfig[3].x;
        this.agility_Textfield.y = heroTextConfig[3].y;
        this.addChild(this.agility_Textfield);
        this.intelligence_Textfield = new egret.TextField();
        this.intelligence_Textfield.text = heroTextConfig[4].name;
        this.intelligence_Textfield.x = heroTextConfig[4].x;
        this.intelligence_Textfield.y = heroTextConfig[4].y;
        this.addChild(this.intelligence_Textfield);
        this.endurance_Textfield = new egret.TextField();
        this.endurance_Textfield.text = heroTextConfig[5].name;
        this.endurance_Textfield.x = heroTextConfig[5].x;
        this.endurance_Textfield.y = heroTextConfig[5].y;
        this.addChild(this.endurance_Textfield);
        this.fightPower_Textfield = new egret.TextField();
        this.fightPower_Textfield.text = heroTextConfig[6].name;
        this.fightPower_Textfield.x = heroTextConfig[6].x;
        this.fightPower_Textfield.y = heroTextConfig[6].y;
        this.addChild(this.fightPower_Textfield);
        this.maxHp_Textfield = new egret.TextField();
        this.maxHp_Textfield.text = heroTextConfig[7].name;
        this.maxHp_Textfield.x = heroTextConfig[7].x;
        this.maxHp_Textfield.y = heroTextConfig[7].y;
        this.addChild(this.maxHp_Textfield);
        this.maxMp_Textfield = new egret.TextField();
        this.maxMp_Textfield.text = heroTextConfig[8].name;
        this.maxMp_Textfield.x = heroTextConfig[8].x;
        this.maxMp_Textfield.y = heroTextConfig[8].y;
        this.addChild(this.maxMp_Textfield);
        this.hp_Textfield = new egret.TextField();
        this.hp_Textfield.text = heroTextConfig[9].name;
        this.hp_Textfield.x = heroTextConfig[9].x;
        this.hp_Textfield.y = heroTextConfig[9].y;
        this.addChild(this.hp_Textfield);
        this.mp_Textfield = new egret.TextField();
        this.mp_Textfield.text = heroTextConfig[10].name;
        this.mp_Textfield.x = heroTextConfig[10].x;
        this.mp_Textfield.y = heroTextConfig[10].y;
        this.addChild(this.mp_Textfield);
    };
    p.setPanelText = function (hero) {
        this.name_Texfield.text = heroTextConfig[0].name + hero.property.name;
        this.attack_Textfield.text = heroTextConfig[1].name + hero.attack;
        this.strength_Textfield.text = heroTextConfig[2].name + hero.strength;
        this.agility_Textfield.text = heroTextConfig[3].name + hero.agility;
        this.intelligence_Textfield.text = heroTextConfig[4].name + hero.intelligence;
        this.endurance_Textfield.text = heroTextConfig[5].name + hero.endurance;
        this.fightPower_Textfield.text = heroTextConfig[6].name + hero.fightPower;
        this.maxHp_Textfield.text = heroTextConfig[7].name + hero.maxHp;
        this.maxMp_Textfield.text = heroTextConfig[8].name + hero.maxMp;
        this.hp_Textfield.text = heroTextConfig[9].name + hero.getHp();
        this.mp_Textfield.text = heroTextConfig[10].name + hero.getMp();
    };
    return HeroInfoPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(HeroInfoPanel,'HeroInfoPanel');
var HeroPanel = (function (_super) {
    __extends(HeroPanel, _super);
    function HeroPanel() {
        _super.call(this);
        this.heroMap = new HeroMap(this);
        this.equipmentMap = new EquipmentMap(this);
        this.equipmentPanel = new EquipmentPanel();
        this.heroInfoPanel = new HeroInfoPanel();
        this.addTouchEvent();
        this.heroInfoPanel.x = 0;
        this.heroInfoPanel.y = 600;
        this.addChild(this.heroInfoPanel);
    }
    var d = __define,c=HeroPanel,p=c.prototype;
    HeroPanel.setHeroPanel = function (panel) {
        this.heroPanel = panel;
    };
    HeroPanel.getHeroPanel = function () {
        return this.heroPanel;
    };
    p.showPanel = function (equipment) {
        this.equipmentPanel.setPanel(equipment);
        this.addChild(this.equipmentPanel);
    };
    p.offShowPanel = function () {
        this.removeChild(this.equipmentPanel);
    };
    p.addTouchEvent = function () {
        this.touchEnabled = false;
        this.equipmentMap.weapon.touchEnabled = true;
        this.equipmentMap.weapon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapWeapon, this);
        this.equipmentMap.shield.touchEnabled = true;
        this.equipmentMap.shield.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapShield, this);
        this.equipmentMap.head.touchEnabled = true;
        this.equipmentMap.head.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapHead, this);
    };
    p.onTapWeapon = function (e) {
        console.log("weapon");
        var weapon;
        for (var i = 0; i < this.hero.equipments.length; i++) {
            if (this.hero.equipments[i].type == equipmentType.WEAPON) {
                weapon = this.hero.equipments[i];
            }
        }
        this.showPanel(weapon);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapWeapon, this);
        this.equipmentMap.weapon.touchEnabled = false;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTapBack, this);
        this.touchEnabled = true;
    };
    p.onTapShield = function (e) {
        console.log("shield");
        var shield;
        for (var i = 0; i < this.hero.equipments.length; i++) {
            if (this.hero.equipments[i].type == equipmentType.SHIELD) {
                shield = this.hero.equipments[i];
            }
        }
        this.showPanel(shield);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapWeapon, this);
        this.equipmentMap.weapon.touchEnabled = false;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTapBack, this);
        this.touchEnabled = true;
    };
    p.onTapHead = function (e) {
        console.log("head");
        var head;
        for (var i = 0; i < this.hero.equipments.length; i++) {
            if (this.hero.equipments[i].type == equipmentType.HEAD) {
                head = this.hero.equipments[i];
            }
        }
        this.showPanel(head);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapHead, this);
        this.equipmentMap.head.touchEnabled = false;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTapBack, this);
        this.touchEnabled = true;
    };
    p.onTapBack = function (e) {
        console.log("back");
        this.offShowPanel();
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTapBack, this);
        this.touchEnabled = false;
        this.equipmentMap.weapon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapWeapon, this);
        this.equipmentMap.weapon.touchEnabled = true;
        this.equipmentMap.shield.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapShield, this);
        this.equipmentMap.shield.touchEnabled = true;
        this.equipmentMap.head.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTapHead, this);
        this.equipmentMap.head.touchEnabled = true;
    };
    p.setHero = function (hero) {
        this.hero = hero;
        this.heroInfoPanel.setPanelText(this.hero);
    };
    return HeroPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(HeroPanel,'HeroPanel');
//# sourceMappingURL=HeroPanel.js.map