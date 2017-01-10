var SceneService = (function () {
    function SceneService() {
        this.observerList = new Array();
    }
    var d = __define,c=SceneService,p=c.prototype;
    p.addObserver = function (observer) {
        this.observerList.push(observer);
    };
    p.notify = function (monsterId) {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(monsterId);
        }
    };
    return SceneService;
}());
egret.registerClass(SceneService,'SceneService',["EventEmitter"]);
//# sourceMappingURL=SceneService.js.map