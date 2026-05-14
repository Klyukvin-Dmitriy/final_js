const { Staff } = require("./Staff");

class StormStaff extends Staff {
  constructor() {
    super();
    this.name = "Посох Бури";
    this.attack = 10;
    this.range = 3;
  }
}

module.exports = { StormStaff };
