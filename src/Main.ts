class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */

    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield: egret.TextField;
    private EventPoint: egret.Point = new egret.Point();
    public IdlePictures: egret.Bitmap[] = [

        this.createBitmapByName("0008_png"), this.createBitmapByName("0009_png"), this.createBitmapByName("0010_png"),
        this.createBitmapByName("0011_png"), this.createBitmapByName("0012_png"), this.createBitmapByName("0013_png"),
        this.createBitmapByName("0014_png"), this.createBitmapByName("0015_png"), this.createBitmapByName("0016_png"),
        this.createBitmapByName("0017_png"), this.createBitmapByName("0018_png"), this.createBitmapByName("0019_png")

    ];

    public WalkingRightPictures: egret.Bitmap[] = [

        this.createBitmapByName("0024_png"), this.createBitmapByName("0025_png"), this.createBitmapByName("0026_png"),
        this.createBitmapByName("0027_png"), this.createBitmapByName("0028_png"), this.createBitmapByName("0029_png"),
        this.createBitmapByName("0030_png"), this.createBitmapByName("0031_png"), this.createBitmapByName("0032_png"),
        this.createBitmapByName("0033_png"), this.createBitmapByName("0034_png")

    ];

    public WalkingLeftPictures: egret.Bitmap[] = [

        this.createBitmapByName("0024_2_png"), this.createBitmapByName("0025_2_png"), this.createBitmapByName("0026_2_png"),
        this.createBitmapByName("0027_2_png"), this.createBitmapByName("0028_2_png"), this.createBitmapByName("0029_2_png"),
        this.createBitmapByName("0030_2_png"), this.createBitmapByName("0031_2_png"), this.createBitmapByName("0032_2_png"),
        this.createBitmapByName("0033_2_png"), this.createBitmapByName("0034_2_png")

    ];

    public Player: Person;
    public ifFindAWay: boolean = false;
    public ifStartMove = false;
    public playerx: number;
    public playery: number;
    public screenService: ScreenService;
    public canMove: boolean;
    public equipmentServer: EquipmentServer;
    public userPanelIsOn: boolean;
    public monsterAttacking: Monster;
    public ifFight: boolean;

    private GoalPoint: egret.Point = new egret.Point();
    private DistancePoint: egret.Point = new egret.Point();
    private Stage01Background: egret.Bitmap;
    private MoveTime = 0;
    private map01: TileMap;
    private astar: AStar;
    private tileX: number;
    private tileY: number;
    private tileSize = 64;
    private currentPath: number = 0;
    private movingTime = 32;
    private ifOnGoal = false;
    private playerBitX: number;
    private playerBitY: number;
    private task01: Task;
    private task02: Task;
    private taskService: TaskService /*= TaskService.getInstance() */;
    private taskPanel: TaskPanel;
    private NPC01: NPC;
    private NPC02: NPC;
    private Npc01Dialogue: string[] = ["你好我是NPC01"]
    private Npc01AcceptDialogue: string[] = ["你好！任务1：去找NPC02对话！"]
    private Npc02Dialogue: string[] = ["你好我是NPC02"]
    private Npc02AcceptDialogue: string[] = ["你好！任务2：杀怪，杀死一个地图上的怪物！"]
    private Npc02SubmitDialogue: string[] = ["你变强了！！！\n点击完成任务后，奖励道具已经自动为您装备，请打开任务面板检查"]
    private dialoguePanel: DialoguePanel;

    private user: User;
    private hero: Hero;
    private sword: Weapon;
    private lance: Weapon;
    private helment: Armor;
    private corseler: Armor;
    private shoes: Armor;
    private weaponJewel: Jewel;
    private armorJewel: Jewel;
    private userPanelButton: egret.Bitmap;

    private commandList: CommandList;

    private userPanel: UserPanel;

    private npcList: NPC[] = [];

    private monsterIdList: string[] = ["slime01", "slime02"];

    private slime: Monster;
    private disx = 0;
    private disy = 0;
    private monsterService: MonsterService;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {

        this.commandList = new CommandList();

        this.canMove = true;
        this.userPanelIsOn = false;
        this.ifFight = false;
        this.Player = new Person();
        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;

        this.map01 = new TileMap();
        this.addChild(this.map01);

        TaskService.getInstance();
        this.task01 = creatTask("task_00");
        this.task01.setMain(this);
        TaskService.getInstance().addTask(this.task01);
        this.task02 = creatTask("task_01");
        this.task02.setMain(this);
        TaskService.getInstance().addTask(this.task02);
        this.taskPanel = new TaskPanel();
        TaskService.getInstance().addObserver(this.taskPanel);

        this.addChild(this.taskPanel);
        this.taskPanel.x = this.stage.width - this.taskPanel.width;
        this.taskPanel.y = 0;

        this.NPC01 = new NPC("npc_0", "NPC_Man_01_png", this.Npc01Dialogue);
        this.NPC01.setTaskAcceptDialogue(this.Npc01AcceptDialogue);
        this.npcList.push(this.NPC01);

        this.NPC02 = new NPC("npc_1", "NPC_Man_02_png", this.Npc02Dialogue);
        this.NPC02.setTaskAcceptDialogue(this.Npc02AcceptDialogue);
        this.NPC02.setTaskSubmitDialogue(this.Npc02SubmitDialogue);
        this.npcList.push(this.NPC02);
        TaskService.getInstance().addObserver(this.NPC01);
        TaskService.getInstance().addObserver(this.NPC02);

        this.screenService = new ScreenService();

        for (var id of this.monsterIdList) {

            var temp = creatMonster(id);
            this.addChild(temp);
            temp.x = temp.posX;
            temp.y = temp.posY;
            MonsterService.getInstance().addMonster(temp);
        }

        this.addChild(this.NPC01);
        this.NPC01.x = 128;
        this.NPC01.y = 64;

        this.addChild(this.NPC02);
        this.NPC02.x = 384;
        this.NPC02.y = 320;

        this.dialoguePanel = DialoguePanel.getInstance();
        this.dialoguePanel.SetMain(this);
        this.addChild(this.dialoguePanel);
        this.dialoguePanel.x = 200;
        this.dialoguePanel.y = 200;

        this.userPanelButton = this.createBitmapByName("userPanelButton_png");
        this.addChild(this.userPanelButton);
        this.userPanelButton.x = 10 * 64 - this.userPanelButton.width;
        this.userPanelButton.y = 0;

        this.addChild(this.Player.PersonBitmap);
        this.Player.PersonBitmap.x = 0;
        this.Player.PersonBitmap.y = 0;

        this.map01.startTile = this.map01.getTile(0, 0);
        this.map01.endTile = this.map01.getTile(0, 0);

        this.astar = new AStar();

        this.user = new User("Player01", 1);
        this.hero = new Hero("H001", "FemaleSaberHero01", Quality.ORAGE, 1, "FemaleSaberHero01_png", HeroType.SABER);
        this.sword = new Weapon("W001", "LeagendSword01", Quality.ORAGE, WeaponType.HANDSWORD, "OrangeSword01_png");
        this.lance = new Weapon("W002", "LeagendLance01", Quality.ORAGE, WeaponType.LANCE, "OrageLance01_png")
        this.helment = new Armor("A001", "Purplrhelment01", Quality.PURPLE, ArmorType.LIGHTARMOR, "PurpleHelmet01_png");
        this.corseler = new Armor("A002", "GreenCorseler01", Quality.GREEN, ArmorType.LIGHTARMOR, "GreenCorseler01_png");
        this.shoes = new Armor("A003", "BlueShoes01", Quality.BLUE, ArmorType.LIGHTARMOR, "BlueShoes01_png");
        this.weaponJewel = new Jewel("J001", "传说武器宝石", Quality.ORAGE);
        this.armorJewel = new Jewel("J002", "普通防具宝石", Quality.WHITE);

        this.sword.addJewl(this.weaponJewel);
        this.helment.addJewl(this.armorJewel);
        this.corseler.addJewl(this.armorJewel);
        this.shoes.addJewl(this.armorJewel);

        this.hero.addHelment(this.helment);
        this.hero.addCorseler(this.corseler);
        this.hero.addShoes(this.shoes);
        this.user.addHeroInTeam(this.hero);
        this.user.addHeros(this.hero);

        EquipmentServer.getInstance();
        EquipmentServer.getInstance().addWeapon(this.sword);
        EquipmentServer.getInstance().addWeapon(this.lance);
        EquipmentServer.getInstance().addArmor(this.helment);
        EquipmentServer.getInstance().addArmor(this.corseler);
        EquipmentServer.getInstance().addArmor(this.shoes);

        this.userPanel = new UserPanel();

        this.userPanel.showHeroInformation(this.hero);
        this.userPanel.x = (this.stage.width - this.userPanel.width) / 2;
        this.userPanel.y = (this.stage.height - this.userPanel.height) / 2;

        this.userPanelButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {

            this.addChild(this.userPanel);
            this.userPanel.showHeroInformation(this.hero);
        }, this)


        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        //RES.getResAsync("description_json", this.startAnimation, this)
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {

            NPC.npcIsChoose = null;
            this.ifFight = false;
            if (this.userPanelIsOn && (e.stageX < this.userPanel.x || e.stageX > this.userPanel.x + this.userPanel.width || e.stageY < this.userPanel.y || e.stageY > this.userPanel.y + this.userPanel.height)) {

                this.removeChild(this.userPanel);
                this.userPanelIsOn = false;
            }

            this.playerx = Math.floor(this.Player.PersonBitmap.x / this.tileSize);
            this.playery = Math.floor(this.Player.PersonBitmap.y / this.tileSize);
            this.playerBitX = this.Player.PersonBitmap.x;
            this.playerBitY = this.Player.PersonBitmap.y;

            this.map01.startTile = this.map01.getTile(this.playerx, this.playery);

            this.Player.PersonBitmap.x = this.playerx * 64;
            this.Player.PersonBitmap.y = this.playery * 64;

            this.currentPath = 0;

            this.EventPoint.x = e.stageX;
            this.EventPoint.y = e.stageY;
            this.tileX = Math.floor(this.EventPoint.x / this.tileSize);
            this.tileY = Math.floor(this.EventPoint.y / this.tileSize);

            for (var npc of this.npcList) {

                if (npc.x / 64 == this.tileX && npc.y / 64 == this.tileY)
                    NPC.npcIsChoose = npc;
            }

            for (var monsterId of this.monsterIdList) {

                var monster = MonsterService.getInstance().getMonster(monsterId);
                if (monster.x / 64 == this.tileX && monster.y / 64 == this.tileY) {

                    this.ifFight = true;
                    this.monsterAttacking = monster;
                }
            }

            this.map01.endTile = this.map01.getTile(this.tileX, this.tileY);
            this.ifFindAWay = this.astar.findPath(this.map01);

            if (this.ifFindAWay) {

                this.currentPath = 0;
            }

            for (let i = 0; i < this.astar.pathArray.length; i++) {

                console.log(this.astar.pathArray[i].x + " And " + this.astar.pathArray[i].y);
            }

            if (this.astar.pathArray.length > 0) {

                this.disx = Math.abs(this.playerx * this.tileSize - this.Player.PersonBitmap.x);
                this.disy = Math.abs(this.playery * this.tileSize - this.Player.PersonBitmap.y);
            }

            if (this.ifFindAWay)
                this.map01.startTile = this.map01.endTile;

            if (this.EventPoint.x >= this.userPanelButton.x && this.EventPoint.y <= this.userPanelButton.height) {

                this.addChild(this.userPanel);
                this.userPanel.showHeroInformation(this.hero);
                this.userPanelIsOn = true;
            }

            if (this.commandList._list.length > 0)
                this.commandList.cancel();

            if (this.canMove && !this.userPanelIsOn)
                this.commandList.addCommand(new WalkCommand(this));

            if (NPC.npcIsChoose != null && !this.userPanelIsOn)
                this.commandList.addCommand(new TalkCommand(this, NPC.npcIsChoose))

            if (this.ifFight)
                this.commandList.addCommand(new FightCommand(this.Player, this, this.monsterAttacking, this.hero.getAttack()));

            this.commandList.execute();
        }, this)

        this.PlayerMove();

        this.PlayerAnimation();

    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {

        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }


    public PlayerMove() {

        var self: any = this;
        var getDistance;

        egret.Ticker.getInstance().register(() => {

            if (this.ifStartMove && self.ifFindAWay) {

                if (self.currentPath < self.astar.pathArray.length - 1) {

                    var distanceX = self.astar.pathArray[self.currentPath + 1].x - self.astar.pathArray[self.currentPath].x;
                    var distanceY = self.astar.pathArray[self.currentPath + 1].y - self.astar.pathArray[self.currentPath].y;
                    if (distanceX < 0)
                        distanceX = distanceX - this.disx;
                    else
                        distanceX = distanceX + this.disx;
                    if (distanceY < 0)
                        distanceY = distanceY - this.disy;
                    else
                        distanceY = distanceY + this.disy;

                    if (distanceX > 0) {

                        self.Player.SetRightOrLeftState(new GoRightState(), self);
                    }

                    if (distanceX <= 0) {

                        self.Player.SetRightOrLeftState(new GoLeftState(), self);
                    }

                    if (!self.IfOnGoal(self.astar.pathArray[self.currentPath + 1])) {

                        self.Player.PersonBitmap.x += distanceX / self.movingTime;
                        self.Player.PersonBitmap.y += distanceY / self.movingTime;
                    } else {

                        self.currentPath += 1;
                    }
                }

                if (self.IfOnGoal(self.map01.endTile)) {

                    self.Player.SetState(new IdleState(), self);
                    this.ifStartMove = false;
                    WalkCommand.canFinish = true;
                    console.log("PM");
                }
            }

            if (this.ifStartMove && !self.ifFindAWay) {

                var distanceX = self.map01.startTile.x - self.playerBitX;
                var distanceY = self.map01.startTile.y - self.playerBitY;

                if (distanceX > 0) {

                    self.Player.SetRightOrLeftState(new GoRightState(), self);
                }

                if (distanceX <= 0) {

                    self.Player.SetRightOrLeftState(new GoLeftState(), self);
                }

                if (!self.IfOnGoal(self.map01.startTile)) {

                    self.Player.PersonBitmap.x += distanceX / self.movingTime;
                    self.Player.PersonBitmap.y += distanceY / self.movingTime;
                } else {

                    self.Player.SetState(new IdleState(), self);
                    this.ifStartMove = false;
                    WalkCommand.canFinish = true;
                    console.log("PM");
                }
            }
        }, self)

    }

    public PictureMove(pic: egret.Bitmap): void {

        var self: any = this;
        var MapMove: Function = function () {

            egret.Tween.removeTweens(pic);
            var dis = self.Player.PersonBitmap.x - self.EventPoint.x;

            if (self.Player.GetIfGoRight() && pic.x >= - (pic.width - self.stage.stageWidth)) {

                egret.Tween.get(pic).to({ x: pic.x - Math.abs(dis) }, self.MoveTime);
            }

            if (self.Player.GetIfGoLeft() && pic.x <= 0) {

                egret.Tween.get(pic).to({ x: pic.x + Math.abs(dis) }, self.MoveTime);
            }

        }

        MapMove();
    }


    public IfOnGoal(tile: Tile): any {

        var self: any = this;

        if (self.Player.PersonBitmap.x == tile.x && self.Player.PersonBitmap.y == tile.y)

            this.ifOnGoal = true;
        else

            this.ifOnGoal = false;

        return this.ifOnGoal;

    }

    public PlayerAnimation(): void {

        var self: any = this;
        var n = 0;
        var GOR = 0;
        var GOL = 0;
        var fight = 0;
        var zhen = 0;
        var zhen2 = 0;
        var zhen3 = 0;
        var standArr = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"];
        var walkRightArr = ["24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34",];
        var fightArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

        var MoveAnimation: Function = function () {

            egret.Ticker.getInstance().register(() => {

                if (zhen % 4 == 0) {

                    if (self.Player.GetIfIdle() && !self.Player.GetIfWalk() && !self.Player.GetIfFight()) {

                        GOR = 0;
                        GOL = 0;
                        fight = 0;

                        var textureName = "00" + standArr[n] + "_png";
                        var texture: egret.Texture = RES.getRes(textureName);
                        self.Player.PersonBitmap.texture = texture;
                        n++;

                        if (n >= standArr.length) {

                            n = 0;
                        }
                    }

                    if (self.Player.GetIfWalk() && self.Player.GetIfGoRight() && !self.Player.GetIfIdle() && !self.Player.GetIfFight()) {

                        n = 0;
                        GOL = 0;
                        fight = 0;

                        var textureName = "00" + walkRightArr[GOR] + "_png";
                        var texture: egret.Texture = RES.getRes(textureName);
                        self.Player.PersonBitmap.texture = texture;
                        GOR++;

                        if (GOR >= walkRightArr.length) {

                            GOR = 0;
                        }
                    }

                    if (self.Player.GetIfWalk() && self.Player.GetIfGoLeft() && !self.Player.GetIfIdle() && !self.Player.GetIfFight()) {

                        n = 0;
                        GOR = 0;
                        fight = 0;
                        var textureName = "00" + walkRightArr[GOL] + "_2_png";
                        var texture: egret.Texture = RES.getRes(textureName);
                        self.Player.PersonBitmap.texture = texture;
                        GOL++;

                        if (GOL >= walkRightArr.length) {

                            GOL = 0;
                        }
                    }

                    if (self.Player.GetIfFight() && !self.Player.GetIfWalk() && !self.Player.GetIfIdle()) {

                        GOR = 0;
                        GOL = 0;
                        n = 0;

                        var textureName = "020" + fightArr[fight] + "_png";
                        var texture: egret.Texture = RES.getRes(textureName);
                        self.Player.PersonBitmap.texture = texture;
                        fight++;

                        if (fight >= fightArr.length) {

                            fight = 0;
                        }
                    }

                }

            }, self);
        }

        var FramePlus: Function = function () {

            egret.Ticker.getInstance().register(() => {

                zhen++;
                if (zhen == 400)
                    zhen = 0;
            }, self)
        }

        MoveAnimation();

        FramePlus();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    // private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
    //     textfield.textFlow = textFlow;
    // }

    public HeroEquipWeapon(weaponId: string) {

        var temp = this.hero.getEquipment(EquipementType.WEAPON)
        if (temp) {

            this.user.package.InPackage(temp);
        }

        this.hero.addWeapon(EquipmentServer.getInstance().getWeapon(weaponId));
        console.log(weaponId);
    }

    public HeroEquipHelement(helmentId: string) {

        var temp = this.hero.getEquipment(EquipementType.HELMENT)
        if (temp) {

            this.user.package.InPackage(temp);
        }

        this.hero.addHelment(EquipmentServer.getInstance().getHelement(helmentId));
    }

    public HeroEquipArmor(Id: string) {

        var temp = this.hero.getEquipment(EquipementType.CORSELER)
        if (temp) {

            this.user.package.InPackage(temp);
        }

        this.hero.addCorseler(EquipmentServer.getInstance().getArmor(Id));
    }

    public HeroEquipShoes(Id: string) {

        var temp = this.hero.getEquipment(EquipementType.SHOES)
        if (temp) {

            this.user.package.InPackage(temp);
        }

        this.hero.addShoes(EquipmentServer.getInstance().getShoe(Id));
    }
}


class Person {

    public PersonBitmap: egret.Bitmap;
    private IsIdle: boolean;
    private IsWalking: boolean;
    private GoRight: boolean = false;
    private GoLeft: boolean = false;
    private IsFight: boolean;
    private IdleOrWalkStateMachine: StateMachine;
    private LeftOrRightStateMachine: StateMachine;

    constructor() {

        this.PersonBitmap = new egret.Bitmap();
        this.PersonBitmap.width = 49;
        this.PersonBitmap.height = 64;
        this.IsIdle = true;
        this.IsWalking = false;
        this.IsFight = false;
        this.IdleOrWalkStateMachine = new StateMachine();
        this.LeftOrRightStateMachine = new StateMachine();

    }

    public SetPersonBitmap(picture: egret.Bitmap) {

        this.PersonBitmap = picture;
    }


    public SetIdle(set: boolean) {

        this.IsIdle = set;
    }

    public GetIfIdle(): boolean {

        return this.IsIdle;
    }

    public SetWalk(set: boolean) {

        this.IsWalking = set;
    }

    public GetIfWalk(): boolean {

        return this.IsWalking
    }

    public SetFight(set: boolean) {

        this.IsFight = set;
    }

    public GetIfFight(): boolean {

        return this.IsFight;
    }

    public SetGoRight() {

        this.GoRight = true;
        this.GoLeft = false;
    }

    public GetIfGoRight(): boolean {

        return this.GoRight;
    }

    public SetGoLeft() {

        this.GoLeft = true;
        this.GoRight = false;
    }

    public GetIfGoLeft(): boolean {

        return this.GoLeft;
    }

    private createBitmapByName(name: string): egret.Bitmap {

        var result = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public SetState(e: State, _tmain: Main) {

        this.IdleOrWalkStateMachine.setState(e, _tmain);
    }

    public SetRightOrLeftState(e: State, _tmain: Main) {

        this.LeftOrRightStateMachine.setState(e, _tmain);
    }


}

interface State {

    OnState(_tmain: Main);

    ExitState(_tmain: Main);

}

class PeopleState implements State {

    OnState(_tmain: Main) { };

    ExitState(_tmain: Main) { };
}

class StateMachine {

    CurrentState: State;

    setState(e: State, _tmain: Main) {

        if (this.CurrentState != null) {
            this.CurrentState.ExitState(_tmain);
        }

        this.CurrentState = e;
        this.CurrentState.OnState(_tmain);
    }
}


class IdleState implements PeopleState {


    OnState(_tmain: Main) {

        _tmain.Player.SetIdle(true);
        _tmain.Player.SetWalk(false);
        _tmain.Player.SetFight(false);
    };

    ExitState(_tmain: Main) {

        _tmain.Player.SetIdle(false);
    };

}

class WalkingState implements PeopleState {

    OnState(_tmain: Main) {

        _tmain.Player.SetIdle(false);
        _tmain.Player.SetWalk(true);
        _tmain.Player.SetFight(false);
    };

    ExitState(_tmain: Main) {

        _tmain.Player.SetWalk(false);
    };
}

class FightState implements PeopleState {

    OnState(_tmain: Main) {

        _tmain.Player.SetFight(true);
        _tmain.Player.SetIdle(false);
        _tmain.Player.SetWalk(false);
    }

    ExitState(_tmain: Main) {

        _tmain.Player.SetFight(false);
    }
}

class GoRightState implements PeopleState {

    OnState(_tmain: Main) {

        _tmain.Player.SetGoRight();
    };

    ExitState(_tmain: Main) { };

}

class GoLeftState implements PeopleState {

    OnState(_tmain: Main) {

        _tmain.Player.SetGoLeft();
    };

    ExitState(_tmain: Main) { };

}



