var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.tileSize = 64;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var list = new CommandList();
        CommandList.setCurrentList(list);
        var gameScence = new egret.DisplayObjectContainer();
        var infoScence = new egret.DisplayObjectContainer();
        //地图和人物部分
        var numCols = 10;
        var numRows = 10;
        this.touchEnabled = true;
        this.map = new GameMap(numCols, numRows);
        gameScence.addChild(this.map);
        this.grid = new Grid(numCols, numRows);
        this.grid.initWalkable();
        var player = new Player(this.grid, this.tileSize);
        Player.setPlayer(player);
        gameScence.addChild(player.playerStage);
        //地图和人物部分结束
        //任务和NPC和怪物部分
        this.touchEnabled = true;
        var scenceService = new SceneService();
        var taskService = new TaskService(scenceService);
        var taskPanel = new TaskPanel(gameScence, taskService);
        var dialoguePanel = new DialoguePanel(gameScence, taskService);
        DialoguePanel.setDialoguePanel(dialoguePanel);
        var npc_0 = new NPC("npc_0", taskService, dialoguePanel);
        npc_0.showNpc(this.map);
        var npc_1 = new NPC("npc_1", taskService, dialoguePanel);
        npc_1.showNpc(this.map);
        var monster = new Monster("001", scenceService);
        monster.showMonster(this.map);
        //任务和NPC和怪物结束
        //人物面板部分
        var gem1 = new Gem("gem_0");
        var gem2 = new Gem("gem_1");
        var gem3 = new Gem("gem_2");
        var sword1 = new Weapon("weapon_0");
        var shield1 = new Shield("shield_0");
        var head1 = new Head("head_0");
        sword1.addGem(gem1);
        shield1.addGem(gem2);
        head1.addGem(gem3);
        var hero1 = new Hero("hero_0");
        var panel = new HeroPanel();
        hero1.equip(sword1);
        hero1.equip(shield1);
        hero1.equip(head1);
        panel.equipmentMap.equip(sword1);
        panel.equipmentMap.equip(shield1);
        panel.equipmentMap.equip(head1);
        hero1.reSetCurrentHMp();
        hero1.setInTeam(true);
        var user = new User();
        user.addHero(hero1);
        User.setHero(hero1);
        HeroPanel.setHeroPanel(panel);
        panel.setHero(hero1);
        infoScence.addChild(panel);
        //人物面板结束
        //命令系统相关
        var npcList = [];
        npcList.push(npc_0);
        npcList.push(npc_1);
        var monsterList = [];
        monsterList.push(monster);
        var commandService = new CommandService(this, gameScence, infoScence, this.map, player, npcList, monsterList, dialoguePanel, list);
        CommandService.setCurrentService(commandService);
        this.map.touchEnabled = true;
        this.map.addEventListener(egret.TouchEvent.TOUCH_TAP, commandService.onTouch, commandService);
        //命令系统相关结束
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map