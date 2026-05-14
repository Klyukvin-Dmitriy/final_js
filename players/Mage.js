const { Player } = require("./Player");
const { Staff } = require("../weapons/Staff");
const { Knife } = require("../weapons/Knife");
const { Arm } = require("../weapons/Arm");

class Mage extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 70;
    this.magic = 100;
    this.speed = 1;
    this.attack = 5;
    this.agility = 8;
    this.luck = 10;
    this.description = "Маг";
    this.weapon = new Staff();
    this.maxLife = this.life;
    this.maxMagic = this.magic;
  }

  getWeaponDowngradeOrder() {
    return [Staff, Knife, Arm];
  }

  takeDamage(damage) {
    if (this.magic > this.maxMagic * 0.5) {
      super.takeDamage(damage / 2);
      this.magic -= 12;
      return;
    }
    super.takeDamage(damage);
  }
}

module.exports = { Mage };
