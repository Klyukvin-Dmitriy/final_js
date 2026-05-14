const { Player } = require("./Player");
const { Bow } = require("../weapons/Bow");
const { Knife } = require("../weapons/Knife");
const { Arm } = require("../weapons/Arm");

class Archer extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 35;
    this.speed = 1;
    this.attack = 5;
    this.agility = 10;
    this.luck = 10;
    this.description = "Лучник";
    this.weapon = new Bow();
    this.maxLife = this.life;
    this.maxMagic = this.magic;
  }

  getWeaponDowngradeOrder() {
    return [Bow, Knife, Arm];
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }
    const weaponDamage = this.weapon.getDamage();
    const weaponRange = this.weapon.range;
    return (
      ((this.attack + weaponDamage) * this.getLuck() * distance) /
      weaponRange
    );
  }
}

module.exports = { Archer };
