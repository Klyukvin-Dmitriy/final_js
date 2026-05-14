const { Weapon } = require("./Weapon");

class Staff extends Weapon {
  constructor() {
    super("Посох", 8, 300, 2);
  }
}

module.exports = { Staff };
