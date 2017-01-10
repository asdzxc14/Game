var EquipmentProperty = (function (_super) {
    __extends(EquipmentProperty, _super);
    function EquipmentProperty() {
        _super.call(this);
        this.name = "";
        this._attack = 0;
        this._defence = 0;
        this._strength = 0;
        this._agility = 0;
        this._intelligence = 0;
        this._endurance = 0;
        this.desc = "";
    }
    var d = __define,c=EquipmentProperty,p=c.prototype;
    return EquipmentProperty;
}(Property));
egret.registerClass(EquipmentProperty,'EquipmentProperty');
//# sourceMappingURL=EquipmentProperty.js.map