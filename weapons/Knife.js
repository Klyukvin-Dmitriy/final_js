const { Weapon } = require("./Weapon");

class Knife extends Weapon {
  constructor() {
    super("Нож", 5, 300, 1);
  }
}

module.exports = { Knife };
