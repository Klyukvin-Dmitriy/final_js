class Weapon {
  constructor(name, attack, durability, range) {
    this.name = name;
    this.attack = attack;
    this.durability = durability;
    this.initDurability = durability;
    this.range = range;
  }

  takeDamage(damage) {
    if (this.durability === Infinity) {
      return;
    }
    this.durability = Math.max(0, this.durability - damage);
  }

  getDamage() {
    if (this.durability < 0) {
      return 0;
    }
    if (this.durability === 0) {
      return 0;
    }
    if (this.initDurability === Infinity) {
      return this.attack;
    }
    const threshold = this.initDurability * 0.3;
    if (this.durability >= threshold) {
      return this.attack;
    }
    return this.attack / 2;
  }

  isBroken() {
    return this.durability === 0;
  }
}

module.exports = { Weapon };
