const { Warrior } = require("./Warrior");
const { Axe } = require("../weapons/Axe");
const { Knife } = require("../weapons/Knife");
const { Arm } = require("../weapons/Arm");

class Dwarf extends Warrior {
  constructor(position, name) {
    super(position, name);
    this.life = 130;
    this.attack = 15;
    this.luck = 20;
    this.description = "Гном";
    this.weapon = new Axe();
    this.maxLife = this.life;
    this._strikeCount = 0;
  }

  getWeaponDowngradeOrder() {
    return [Axe, Knife, Arm];
  }

  takeDamage(damage) {
    this._strikeCount += 1;
    let d = damage;
    if (this._strikeCount % 6 === 0 && this.getLuck() > 0.5) {
      d = damage / 2;
    }
    super.takeDamage(d);
  }
}

module.exports = { Dwarf };
