const { Bow } = require("./Bow");

class LongBow extends Bow {
  constructor() {
    super();
    this.name = "Длинный лук";
    this.attack = 15;
    this.range = 4;
  }
}

module.exports = { LongBow };
