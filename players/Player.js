const { Arm } = require("../weapons/Arm");

class Player {
  constructor(position, name) {
    this.position = position;
    this.name = name;
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = "Игрок";
    this.weapon = new Arm();
    this.maxLife = this.life;
    this.maxMagic = this.magic;
  }

  getLuck() {
    const randomNumber = Math.floor(Math.random() * 101);
    return (randomNumber + this.luck) / 100;
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }
    const weaponDamage = this.weapon.getDamage();
    return ((this.attack + weaponDamage) * this.getLuck()) / distance;
  }

  takeDamage(damage) {
    this.life = Math.max(0, this.life - damage);
  }

  isDead() {
    return this.life === 0;
  }

  getWeaponDowngradeOrder() {
    return [Arm];
  }

  checkWeapon() {
    if (!this.weapon.isBroken()) {
      return;
    }
    const order = this.getWeaponDowngradeOrder();
    const idx = order.findIndex((Cls) => this.weapon instanceof Cls);
    const next = order[idx + 1];
    const { Arm: ArmCls } = require("../weapons/Arm");
    this.weapon = next ? new next() : new ArmCls();
  }

  moveLeft(distance) {
    const step = Math.min(distance, this.speed);
    this.position -= step;
  }

  moveRight(distance) {
    const step = Math.min(distance, this.speed);
    this.position += step;
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(Math.abs(distance));
    } else {
      this.moveRight(distance);
    }
  }

  isAttackBlocked() {
    return this.getLuck() > (100 - this.luck) / 100;
  }

  dodged() {
    return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
  }

  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      this.checkWeapon();
      return;
    }
    if (this.dodged()) {
      return;
    }
    this.takeDamage(damage);
  }

  tryAttack(enemy) {
    const gap = Math.abs(this.position - enemy.position);
    if (gap > this.weapon.range) {
      return;
    }

    this.weapon.takeDamage(10 * this.getLuck());
    this.checkWeapon();

    const distance = gap === 0 ? 1 : gap;
    let dmg = this.getDamage(distance);
    if (gap === 0) {
      enemy.moveRight(1);
      enemy.takeAttack(dmg * 2);
    } else {
      enemy.takeAttack(dmg);
    }
    enemy.checkWeapon();
  }

  chooseEnemy(players) {
    const foes = players.filter((p) => p !== this && !p.isDead());
    if (foes.length === 0) {
      return null;
    }
    return foes.reduce((best, p) => (p.life < best.life ? p : best));
  }

  moveToEnemy(enemy) {
    if (!enemy) {
      return;
    }
    const delta = enemy.position - this.position;
    if (delta > 0) {
      this.moveRight(Math.min(this.speed, delta));
    } else if (delta < 0) {
      this.moveLeft(Math.min(this.speed, Math.abs(delta)));
    }
  }

  turn(players) {
    const enemy = this.chooseEnemy(players);
    if (!enemy) {
      return;
    }
    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
  }
}

function play(players) {
  let round = 1;
  const aliveCount = () => players.filter((p) => !p.isDead()).length;

  while (aliveCount() > 1 && round < 500) {
    console.log(`\n--- Раунд ${round} ---`);
    for (const p of players) {
      if (!p.isDead()) {
        console.log(`${p.name} (${p.description}) двигается и бьёт`);
        p.turn(players);
      }
    }
    round++;
  }

  const winner = players.find((p) => !p.isDead()) || null;
  if (winner) {
    console.log(`\nПобедил: ${winner.name}`);
  } else {
    console.log("\nНикто не выжил");
  }
  return winner;
}

module.exports = { Player, play };
