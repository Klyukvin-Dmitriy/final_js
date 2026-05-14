const { Mage } = require("./Mage");
const { StormStaff } = require("../weapons/StormStaff");
const { Knife } = require("../weapons/Knife");
const { Arm } = require("../weapons/Arm");

class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 120;
    this.attack = 6;
    this.luck = 12;
    this.description = "Демиург";
    this.weapon = new StormStaff();
    this.maxLife = this.life;
    this.maxMagic = this.magic;
  }

  getWeaponDowngradeOrder() {
    return [StormStaff, Knife, Arm];
  }

  getDamage(distance) {
    const base = super.getDamage(distance);
    if (base === 0) {
      return 0;
    }
    if (this.magic > 0 && this.getLuck() > 0.6) {
      return base * 1.5;
    }
    return base;
  }
}

module.exports = { Demiurge };
