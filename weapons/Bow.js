const { Weapon } = require("./Weapon");

class Bow extends Weapon {
  constructor() {
    super("Лук", 10, 200, 3);
  }
}

module.exports = { Bow };
