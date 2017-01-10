var buttonConfig = {
    textX: 20, textY: 20,
    changToInfoX: 256, changToInfoY: 700, changToInfoWidth: 100, changToInfoHeight: 50,
    changToGameX: 448, changToGameY: 0, changToGameWidth: 100, changToGameHeight: 50
};
var CommandService = (function () {
    function CommandService(stage, gameScence, infoScence, map, player, npcList, monsterList, dialoguePanel, commandList) {
        this.frozen = false;
        this.stage = stage;
        this.gameScence = gameScence;
        this.infoScence = infoScence;
        this.map = map;
        this.player = player;
        this.npcList = npcList;
        this.monsterList = monsterList;
        this.dialoguePanel = dialoguePanel;
        this.commandList = commandList;
        this.drawChangeToGameButton(buttonConfig.changToGameX, buttonConfig.changToGameY, buttonConfig.changToGameWidth, buttonConfig.changToGameHeight);
        this.drawChangeToInfoButton(buttonConfig.changToInfoX, buttonConfig.changToInfoY, buttonConfig.changToInfoWidth, buttonConfig.changToInfoHeight);
        this.stage.addChild(this.gameScence);
        this.stage.addChild(this.changeToInfoButton);
    }
    var d = __define,c=CommandService,p=c.prototype;
    p.drawChangeToInfoButton = function (x, y, width, height) {
        this.changeToInfoButton = new egret.DisplayObjectContainer();
        var backGround = new egret.Shape();
        backGround.graphics.beginFill(0x808000, 1);
        backGround.graphics.drawRect(0, 0, width, height);
        backGround.graphics.endFill();
        this.changeToInfoButton.addChild(backGround);
        var textField = new egret.TextField();
        textField.text = "信息";
        textField.x = buttonConfig.textX;
        textField.y = buttonConfig.textY;
        this.changeToInfoButton.addChild(textField);
        this.changeToInfoButton.x = x;
        this.changeToInfoButton.y = y;
        this.changeToInfoButton.touchEnabled = true;
        this.changeToInfoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeToInfoScence, this);
        console.log("画信息按钮");
    };
    p.drawChangeToGameButton = function (x, y, width, height) {
        this.changeToGameButton = new egret.DisplayObjectContainer();
        var backGround = new egret.Shape();
        backGround.graphics.beginFill(0x808000, 1);
        backGround.graphics.drawRect(0, 0, width, height);
        backGround.graphics.endFill();
        this.changeToGameButton.addChild(backGround);
        var textField = new egret.TextField();
        textField.text = "返回";
        textField.x = buttonConfig.textX;
        textField.y = buttonConfig.textY;
        this.changeToGameButton.addChild(textField);
        this.changeToGameButton.x = x;
        this.changeToGameButton.y = y;
        this.changeToGameButton.touchEnabled = true;
        this.changeToGameButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeToGameScence, this);
        console.log("画返回按钮");
    };
    p.changeToGameScence = function (e) {
        this.stage.removeChild(this.infoScence);
        this.stage.removeChild(this.changeToGameButton);
        this.stage.addChild(this.gameScence);
        this.stage.addChild(this.changeToInfoButton);
    };
    p.changeToInfoScence = function (e) {
        this.stage.removeChild(this.gameScence);
        this.stage.removeChild(this.changeToInfoButton);
        var panel = HeroPanel.getHeroPanel();
        panel.setHero(User.getHero());
        this.stage.addChild(this.infoScence);
        this.stage.addChild(this.changeToGameButton);
    };
    CommandService.setCurrentService = function (service) {
        this.currentService = service;
    };
    CommandService.getCurrentService = function () {
        return this.currentService;
    };
    p.freeze = function () {
        this.frozen = true;
        console.log("命令服务锁定");
    };
    p.unfreeze = function () {
        this.frozen = false;
        console.log("命令服务解锁");
    };
    p.lock = function () {
        this.freeze();
    };
    p.unlock = function () {
        egret.setTimeout(this.unfreeze, this, 10);
    };
    p.onTouch = function (e) {
        var x = Math.floor(e.stageX / 64);
        var y = Math.floor(e.stageY / 64);
        var player = Player.getPlayer();
        var playerX = Math.floor(player.playerStage.x / 64);
        var playerY = Math.floor(player.playerStage.y / 64);
        if (!this.frozen) {
            console.log("点击事件" + "(" + e.stageX + "," + e.stageY + ")");
            console.log("点击位置" + "(" + x + "," + y + ")");
            console.log("玩家位置" + "(" + playerX + "," + playerY + ")");
            this.checkMap(x, y, playerX, playerY);
        }
        else {
            this.commandList.cancel();
        }
    };
    p.checkMap = function (x, y, playerX, playerY) {
        this.checkNpc(x, y, playerX, playerY);
    };
    p.checkNpc = function (x, y, playerX, playerY) {
        for (var i = 0; i < this.npcList.length; i++) {
            var npc = this.npcList[i];
            var npcX = Math.floor(npc.npcStageX / 64);
            var npcY = Math.floor((npc.npcStageY + 64) / 64);
            var talkPosX = Math.floor(npc.talkPosX / 64);
            var talkPosY = Math.floor(npc.talkPosY / 64);
            console.log("NPC位置" + "(" + npcX + "," + npcY + ")");
            if (x == npcX && y == npcY) {
                this.lock();
                console.log("去与NPC对话");
                if (playerX == talkPosX && playerY == talkPosY) {
                    this.commandList.addCommand(new TalkCommand(this.npcList[i]));
                    this.commandList.execute();
                }
                else {
                    this.commandList.addCommand(new WalkCommand(this.npcList[i].talkPosX, this.npcList[i].talkPosY));
                    this.commandList.addCommand(new TalkCommand(this.npcList[i]));
                    this.commandList.execute();
                }
                break;
            }
            else if (i == (this.npcList.length - 1)) {
                console.log("不是NPC");
                this.checkMonster(x, y, playerX, playerY);
                break;
            }
        }
    };
    p.checkMonster = function (x, y, playerX, playerY) {
        for (var i = 0; i < this.monsterList.length; i++) {
            var monster = this.monsterList[i];
            var monsterX = Math.floor(monster.monster.x / 64);
            var monsterY = Math.floor(monster.monster.y / 64);
            var fightPosX = Math.floor(monster.monsterFightPosX / 64);
            var fightPosY = Math.floor(monster.monsterFightPosY / 64);
            console.log("怪物位置" + "(" + monsterX + "," + monsterY + ")");
            if (x == monsterX && y == monsterY) {
                this.lock();
                console.log("去与怪物战斗");
                if (playerX == fightPosX && playerY == fightPosY) {
                    this.commandList.addCommand(new FightCommand(this.monsterList[i]));
                    this.commandList.execute();
                }
                else {
                    this.commandList.addCommand(new WalkCommand(this.monsterList[i].monsterFightPosX, this.monsterList[i].monsterFightPosY));
                    this.commandList.addCommand(new FightCommand(this.monsterList[i]));
                    this.commandList.execute();
                }
                break;
            }
            else if (i == (this.monsterList.length - 1)) {
                console.log("不是怪物");
                this.checkMove(x, y);
                break;
            }
        }
    };
    p.checkMove = function (x, y) {
        console.log("开始移动");
        this.commandList.addCommand(new WalkCommand(x * 64, y * 64));
        this.commandList.execute();
    };
    return CommandService;
}());
egret.registerClass(CommandService,'CommandService');
//# sourceMappingURL=CommandService.js.map