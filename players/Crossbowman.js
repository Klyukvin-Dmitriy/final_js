const { Archer } = require("./Archer");
const { LongBow } = require("../weapons/LongBow");
const { Knife } = require("../weapons/Knife");
const { Arm } = require("../weapons/Arm");

class Crossbowman extends Archer {
  constructor(position, name) {
    super(position, name);
    this.life = 85;
    this.attack = 8;
    this.agility = 20;
    this.luck = 15;
    this.description = "Арбалетчик";
    this.weapon = new LongBow();
    this.maxLife = this.life;
  }

  getWeaponDowngradeOrder() {
    return [LongBow, Knife, Arm];
  }
}

module.exports = { Crossbowman };
