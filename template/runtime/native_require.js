
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"bin-debug/command/Command.js",
	"bin-debug/command/CommandService.js",
	"bin-debug/fightService/BattleService.js",
	"bin-debug/item/Property.js",
	"bin-debug/hero/Character.js",
	"bin-debug/hero/CharacterProperty.js",
	"bin-debug/hero/Hero.js",
	"bin-debug/hero/HeroProperty.js",
	"bin-debug/item/Item.js",
	"bin-debug/item/Equipment.js",
	"bin-debug/item/EquipmentProperty.js",
	"bin-debug/item/Gem.js",
	"bin-debug/item/GemProperty.js",
	"bin-debug/item/Head.js",
	"bin-debug/item/HeadProperty.js",
	"bin-debug/item/Shield.js",
	"bin-debug/item/ShieldProperty.js",
	"bin-debug/item/Weapon.js",
	"bin-debug/item/WeaponProperty.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/map/FindWay.js",
	"bin-debug/map/GameMap.js",
	"bin-debug/monster/Monster.js",
	"bin-debug/npc/NPC.js",
	"bin-debug/npc/NPCState.js",
	"bin-debug/player/Player.js",
	"bin-debug/player/state/IdleState.js",
	"bin-debug/player/state/MoveState.js",
	"bin-debug/player/state/PlayerState.js",
	"bin-debug/stateMachine/StateMachine.js",
	"bin-debug/taskService/DialoguePanel.js",
	"bin-debug/taskService/EventEmitter.js",
	"bin-debug/taskService/Observer.js",
	"bin-debug/taskService/SceneService.js",
	"bin-debug/taskService/Task.js",
	"bin-debug/taskService/TaskPanel.js",
	"bin-debug/taskService/TaskService.js",
	"bin-debug/User/User.js",
	"bin-debug/userPanel/EquipmentPanel.js",
	"bin-debug/userPanel/HeroPanel.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};