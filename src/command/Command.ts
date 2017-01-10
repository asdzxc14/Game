
interface Command {

    execute(callback: Function): void;

    cancel(callback: Function): void;

}

class WalkCommand implements Command {
    private x;
    private y;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    execute(callback: Function): void {
        var player = Player.getPlayer();
        player.startMove(this.x, this.y, function () {
            callback();
        });
    }

    cancel(callback: Function) {
        var player = Player.getPlayer();
        player.stopMove(function () {
            callback();
        });
    }
}

class FightCommand implements Command {

    private currentMonster: Monster;
    private currentHero: Hero;
    private battleService: BattleService;

    constructor(monster: Monster) {
        this.currentMonster = monster;
        this.currentHero = User.getHero();
        this.battleService = new BattleService(this.currentHero, this.currentMonster);
    }

    execute(callback: Function): void {
        console.log("开始战斗");
        this.battleService.startBattle(callback);
    }

    cancel(callback: Function) {
        console.log("脱离战斗");
        this.battleService.stopBattle(callback);
    }
}

class TalkCommand implements Command {

    private currentNpc: NPC;
    private list: CommandList;

    constructor(npc: NPC) {
        this.currentNpc = npc;
    }

    execute(callback: Function): void {
        this.currentNpc.talkToNpc(callback);
        console.log("打开对话框");
    }

    cancel(callback: Function) {
        this.currentNpc.stopTalkToNpc(callback);
        console.log("因取消而关闭对话框");
    }
}

class CommandList {

    private _list: Command[] = [];
    private currentCommand: Command;
    private _frozen = false;

    public freeze() {
        console.log("命令列表锁定");
        this._frozen = true;
    }

    public unfreeze() {
        console.log("命令列表解锁");
        this._frozen = false;
    }

    public lock() {
        this.freeze();
    }

    public unlock() {
        egret.setTimeout(this.unfreeze, this, 100);
    }

    private static currentList: CommandList;

    public static setCurrentList(list: CommandList) {
        this.currentList = list;
    }

    public static getCurrentList(): CommandList {
        return this.currentList;
    }

    addCommand(command: Command) {
        this._list.push(command);
    }

    execute() {

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

            command.execute(() => {
                service.unlock();
                this.unlock();
                this.execute();
            })

        }
        else {
            console.log("全部命令执行完毕")
        }
    }

    cancel() {
        this._frozen = true;
        var command = this.currentCommand;
        var service = CommandService.getCurrentService();

        egret.setTimeout(() => {
            if (this._frozen) {
                service.unlock();
                this._frozen = false;
            }

        }, this, 2000);

        if (command) {
            command.cancel(() => {
                service.unlock();
                this.unlock();
            });
            this._list = [];
        }

    }

}

