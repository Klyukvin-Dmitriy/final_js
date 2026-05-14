const { Player } = require("./Player");
const { Sword } = require("../weapons/Sword");
const { Knife } = require("../weapons/Knife");
const { Arm } = require("../weapons/Arm");

class Warrior extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 120;
    this.magic = 20;
    this.speed = 2;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = "Воин";
    this.weapon = new Sword();
    this.maxLife = 120;
    this.maxMagic = this.magic;
  }

  getWeaponDowngradeOrder() {
    return [Sword, Knife, Arm];
  }

  takeDamage(damage) {
    const lowHp = this.life < this.maxLife * 0.5;
    if (lowHp && this.getLuck() > 0.8) {
      if (this.magic > 0) {
        const absorbed = Math.min(damage, this.magic);
        this.magic -= absorbed;
        const rest = damage - absorbed;
        if (rest > 0) {
          super.takeDamage(rest);
        }
        return;
      }
    }
    super.takeDamage(damage);
  }
}

module.exports = { Warrior };
