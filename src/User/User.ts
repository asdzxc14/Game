class User {

    public static hero:Hero;
	heros:Hero[] = [];
    herointeam:Hero[] = [];

	public constructor() {
	}

    public static setHero(hero:Hero){
        this.hero = hero;
    }

    public static getHero():Hero{
        return this.hero;
    }

	public addHero(hero:Hero):void {
		this.heros.push(hero);
	}

	get heroInTeam():Hero[] {
		var heroInTeam:Hero[] = [];

        for(var i = 0; i < this.heros.length; i++) {
            if(this.heros[i].isInTeam) {
                heroInTeam.push(this.heros[i]);

            }
        }

        return heroInTeam;

	}

	get fightPower():number {

        var result = 0;

        var heros:Hero[] = this.heroInTeam;

        for(var i = 0; i < heros.length; i++) {
            result += heros[i].fightPower;

        }   

        return result;

    }

}