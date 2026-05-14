const { Weapon } = require("./weapons/Weapon");
const { Arm } = require("./weapons/Arm");
const { Bow } = require("./weapons/Bow");
const { Sword } = require("./weapons/Sword");
const { Knife } = require("./weapons/Knife");
const { Staff } = require("./weapons/Staff");
const { LongBow } = require("./weapons/LongBow");
const { Axe } = require("./weapons/Axe");
const { StormStaff } = require("./weapons/StormStaff");

const { Player, play } = require("./players/Player");
const { Warrior } = require("./players/Warrior");
const { Archer } = require("./players/Archer");
const { Mage } = require("./players/Mage");
const { Dwarf } = require("./players/Dwarf");
const { Crossbowman } = require("./players/Crossbowman");
const { Demiurge } = require("./players/Demiurge");

if (require.main === module) {
  const arena = [
    new Warrior(0, "Алёша"),
    new Archer(4, "Леголас"),
    new Mage(2, "Гендальф"),
  ];
  play(arena);
}

module.exports = {
  Weapon,
  Arm,
  Bow,
  Sword,
  Knife,
  Staff,
  LongBow,
  Axe,
  StormStaff,
  Player,
  Warrior,
  Archer,
  Mage,
  Dwarf,
  Crossbowman,
  Demiurge,
  play,
};
