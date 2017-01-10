var uId = 0;
var itemList;
var itemStatusConfig = {
    INBAG: 0,
    INUSE: 1,
};
var Item = (function () {
    function Item() {
        this.status = itemStatusConfig.INBAG;
        this.uId = uId + 1;
        uId++;
    }
    var d = __define,c=Item,p=c.prototype;
    p.setItemStatus = function (status) {
        this.status = status;
    };
    return Item;
}());
egret.registerClass(Item,'Item');
//# sourceMappingURL=Item.js.map