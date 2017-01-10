var User = (function () {
    function User() {
        this.heros = [];
        this.herointeam = [];
    }
    var d = __define,c=User,p=c.prototype;
    User.setHero = function (hero) {
        this.hero = hero;
    };
    User.getHero = function () {
        return this.hero;
    };
    p.addHero = function (hero) {
        this.heros.push(hero);
    };
    d(p, "heroInTeam"
        ,function () {
            var heroInTeam = [];
            for (var i = 0; i < this.heros.length; i++) {
                if (this.heros[i].isInTeam) {
                    heroInTeam.push(this.heros[i]);
                }
            }
            return heroInTeam;
        }
    );
    d(p, "fightPower"
        ,function () {
            var result = 0;
            var heros = this.heroInTeam;
            for (var i = 0; i < heros.length; i++) {
                result += heros[i].fightPower;
            }
            return result;
        }
    );
    return User;
}());
egret.registerClass(User,'User');
//# sourceMappingURL=User.js.map