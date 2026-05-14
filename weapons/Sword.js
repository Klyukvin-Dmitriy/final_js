const { Weapon } = require("./Weapon");

class Sword extends Weapon {
  constructor() {
    super("Меч", 25, 500, 1);
  }
}

module.exports = { Sword };
