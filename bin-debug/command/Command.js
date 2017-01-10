var WalkCommand = (function () {
    function WalkCommand(x, y) {
        this.x = x;
        this.y = y;
    }
    var d = __define,c=WalkCommand,p=c.prototype;
    p.execute = function (callback) {
        var player = Player.getPlayer();
        player.startMove(this.x, this.y, function () {
            callback();
        });
    };
    p.cancel = function (callback) {
        var player = Player.getPlayer();
        player.stopMove(function () {
            callback();
        });
    };
    return WalkCommand;
}());
egret.registerClass(WalkCommand,'WalkCommand',["Command"]);
var FightCommand = (function () {
    function FightCommand(monster) {
        this.currentMonster = monster;
        this.currentHero = User.getHero();
        this.battleService = new BattleService(this.currentHero, this.currentMonster);
    }
    var d = __define,c=FightCommand,p=c.prototype;
    p.execute = function (callback) {
        console.log("开始战斗");
        this.battleService.startBattle(callback);
    };
    p.cancel = function (callback) {
        console.log("脱离战斗");
        this.battleService.stopBattle(callback);
    };
    return FightCommand;
}());
egret.registerClass(FightCommand,'FightCommand',["Command"]);
var TalkCommand = (function () {
    function TalkCommand(npc) {
        this.currentNpc = npc;
    }
    var d = __define,c=TalkCommand,p=c.prototype;
    p.execute = function (callback) {
        this.currentNpc.talkToNpc(callback);
        console.log("打开对话框");
    };
    p.cancel = function (callback) {
        this.currentNpc.stopTalkToNpc(callback);
        console.log("因取消而关闭对话框");
    };
    return TalkCommand;
}());
egret.registerClass(TalkCommand,'TalkCommand',["Command"]);
var CommandList = (function () {
    function CommandList() {
        this._list = [];
        this._frozen = false;
    }
    var d = __define,c=CommandList,p=c.prototype;
    p.freeze = function () {
        console.log("命令列表锁定");
        this._frozen = true;
    };
    p.unfreeze = function () {
        console.log("命令列表解锁");
        this._frozen = false;
    };
    p.lock = function () {
        this.freeze();
    };
    p.unlock = function () {
        egret.setTimeout(this.unfreeze, this, 100);
    };
    CommandList.setCurrentList = function (list) {
        this.currentList = list;
    };
    CommandList.getCurrentList = function () {
        return this.currentList;
    };
    p.addCommand = function (command) {
        this._list.push(command);
    };
    p.execute = function () {
        var _this = this;
        if (this._frozen) {
            egret.setTimeout(this.execute, this, 100);
            return;
        }
        var command = this._list.shift();
        var service = CommandService.getCurrentService();
        this.currentCommand = command;
        if (command) {
            console.log("执行命令", command);
            service.lock();
            this.lock();
            command.execute(function () {
                service.unlock();
                _this.unlock();
                _this.execute();
            });
        }
        else {
            console.log("全部命令执行完毕");
        }
    };
    p.cancel = function () {
        var _this = this;
        this._frozen = true;
        var command = this.currentCommand;
        var service = CommandService.getCurrentService();
        egret.setTimeout(function () {
            if (_this._frozen) {
                service.unlock();
                _this._frozen = false;
            }
        }, this, 2000);
        if (command) {
            command.cancel(function () {
                service.unlock();
                _this.unlock();
            });
            this._list = [];
        }
    };
    return CommandList;
}());
egret.registerClass(CommandList,'CommandList');
//# sourceMappingURL=Command.js.map