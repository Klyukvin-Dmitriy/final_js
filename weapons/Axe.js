const { Sword } = require("./Sword");

class Axe extends Sword {
  constructor() {
    super();
    this.name = "Секира";
    this.attack = 27;
    this.durability = 800;
    this.initDurability = 800;
  }
}

module.exports = { Axe };
