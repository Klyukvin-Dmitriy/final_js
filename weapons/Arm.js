const { Weapon } = require("./Weapon");

class Arm extends Weapon {
  constructor() {
    super("Рука", 1, Infinity, 1);
  }
}

module.exports = { Arm };
