const {
  Weapon,
  Arm,
  Bow,
  Sword,
  Knife,
  Staff,
  LongBow,
  Axe,
  StormStaff,
} = require("./index");
const { Player, play } = require("./players/Player");
const { Warrior } = require("./players/Warrior");
const { Archer } = require("./players/Archer");
const { Mage } = require("./players/Mage");
const { Dwarf } = require("./players/Dwarf");
const { Crossbowman } = require("./players/Crossbowman");
const { Demiurge } = require("./players/Demiurge");

describe("Weapon", () => {
  test("takeDamage ограничивает прочность снизу нулём", () => {
    const w = new Weapon("Тест", 10, 10, 1);
    w.takeDamage(4);
    expect(w.durability).toBe(6);
    w.takeDamage(50);
    expect(w.durability).toBe(0);
  });

  test("getDamage учитывает порог 30% прочности", () => {
    const bow = new Bow();
    expect(bow.getDamage()).toBe(10);
    bow.takeDamage(100);
    expect(bow.getDamage()).toBe(10);
    bow.takeDamage(50);
    expect(bow.getDamage()).toBe(5);
    bow.takeDamage(150);
    expect(bow.getDamage()).toBe(0);
  });

  test("Arm не ломается и не теряет прочность", () => {
    const arm = new Arm();
    arm.takeDamage(999);
    expect(arm.durability).toBe(Infinity);
    expect(arm.isBroken()).toBe(false);
    expect(arm.getDamage()).toBe(1);
  });

  test("isBroken при нулевой прочности", () => {
    const k = new Knife();
    k.takeDamage(300);
    expect(k.isBroken()).toBe(true);
  });
});

describe("Конкретное оружие", () => {
  test("табличные значения базового оружия", () => {
    expect(new Sword()).toMatchObject({
      name: "Меч",
      attack: 25,
      durability: 500,
      range: 1,
    });
    expect(new Staff()).toMatchObject({
      name: "Посох",
      attack: 8,
      durability: 300,
      range: 2,
    });
  });

  test("улучшенное оружие", () => {
    expect(new LongBow()).toMatchObject({
      name: "Длинный лук",
      attack: 15,
      range: 4,
      durability: 200,
    });
    expect(new Axe()).toMatchObject({
      name: "Секира",
      attack: 27,
      durability: 800,
    });
    expect(new StormStaff()).toMatchObject({
      name: "Посох Бури",
      attack: 10,
      range: 3,
    });
  });
});

describe("Player", () => {
  test("базовые статы и takeDamage", () => {
    const p = new Player(3, "Тест");
    expect(p.position).toBe(3);
    p.takeDamage(30);
    expect(p.life).toBe(70);
    p.takeDamage(200);
    expect(p.life).toBe(0);
    expect(p.isDead()).toBe(true);
  });

  test("getDamage возвращает 0 если цель вне дальности оружия", () => {
    const p = new Player(0, "Т");
    jest.spyOn(p, "getLuck").mockReturnValue(1);
    expect(p.getDamage(2)).toBe(0);
  });

  test("движение ограничено speed", () => {
    const w = new Warrior(6, "В");
    w.moveLeft(5);
    expect(w.position).toBe(4);
    w.moveRight(2);
    expect(w.position).toBe(6);
    w.moveRight(1);
    expect(w.position).toBe(7);
  });

  test("move отрицательное — влево (не больше speed за вызов)", () => {
    const p = new Player(5, "П");
    p.move(-2);
    expect(p.position).toBe(4);
  });

  test("chooseEnemy выбирает живого с минимальным HP", () => {
    const a = new Player(0, "A");
    const b = new Player(0, "B");
    const c = new Player(0, "C");
    a.life = 50;
    b.life = 10;
    c.life = 40;
    expect(a.chooseEnemy([a, b, c])).toBe(b);
  });
});

describe("Warrior", () => {
  test("поглощение урона маной при низком HP и высокой удаче", () => {
    const w = new Warrior(0, "Воин");
    w.life = 50;
    w.magic = 20;
    jest.spyOn(w, "getLuck").mockReturnValue(0.81);
    w.takeDamage(5);
    expect(w.magic).toBe(15);
    expect(w.life).toBe(50);
  });
});

describe("Mage", () => {
  test("пока мана > 50%, урон по жизни уменьшен вдвое и тратится мана", () => {
    const m = new Mage(0, "М");
    m.takeDamage(50);
    expect(m.life).toBe(45);
    expect(m.magic).toBe(88);
  });
});

describe("Archer", () => {
  test("формула урона с дистанцией", () => {
    const a = new Archer(0, "Л");
    jest.spyOn(a, "getLuck").mockReturnValue(1);
    const d = a.getDamage(2);
    expect(d).toBeCloseTo((5 + 10) * (2 / 3), 5);
  });
});

describe("Dwarf", () => {
  test("каждый 6-й удар может быть ослаблен", () => {
    const d = new Dwarf(0, "Г");
    jest.spyOn(d, "getLuck").mockReturnValue(0.6);
    for (let i = 0; i < 5; i++) {
      d.takeDamage(10);
    }
    const lifeBefore = d.life;
    d.takeDamage(10);
    expect(d.life).toBeGreaterThan(lifeBefore - 10);
  });
});

describe("Бой tryAttack / takeAttack", () => {
  test("без досягаемости урон не проходит", () => {
    const w = new Warrior(0, "В");
    const a = new Archer(5, "Л");
    const life = a.life;
    w.tryAttack(a);
    expect(a.life).toBe(life);
  });

  test("при достижении дистанции урон наносится", () => {
    const w = new Warrior(1, "В");
    const a = new Archer(2, "Л");
    jest.spyOn(w, "getLuck").mockReturnValue(1);
    jest.spyOn(w, "getDamage").mockReturnValue(20);
    jest.spyOn(a, "isAttackBlocked").mockReturnValue(false);
    jest.spyOn(a, "dodged").mockReturnValue(false);
    w.tryAttack(a);
    expect(a.life).toBeLessThan(80);
  });

  test("блок направляет урон в оружие", () => {
    const w = new Warrior(1, "В");
    const a = new Archer(2, "Л");
    jest.spyOn(a, "isAttackBlocked").mockReturnValue(true);
    const dur = a.weapon.durability;
    jest.spyOn(w, "getLuck").mockReturnValue(0.1);
    w.tryAttack(a);
    expect(a.weapon.durability).toBeLessThanOrEqual(dur);
  });
});

describe("Crossbowman и Demiurge", () => {
  test("арбалетчик создаётся с длинным луком", () => {
    const c = new Crossbowman(0, "К");
    expect(c.weapon.name).toBe("Длинный лук");
    expect(c.description).toBe("Арбалетчик");
  });

  test("демиург усиливает урон при мане и удаче", () => {
    const d = new Demiurge(0, "Д");
    d.magic = 5;
    jest.spyOn(Player.prototype, "getDamage").mockReturnValueOnce(10);
    jest.spyOn(d, "getLuck").mockReturnValueOnce(0.7);
    expect(d.getDamage(1)).toBe(15);
  });
});

describe("play", () => {
  test("завершается победителем", () => {
    const spy = jest.spyOn(console, "log").mockImplementation(() => {});
    const a = new Warrior(0, "A");
    const b = new Archer(1, "B");
    b.life = 1;
    jest.spyOn(Player.prototype, "getLuck").mockReturnValue(0.5);
    jest.spyOn(Player.prototype, "isAttackBlocked").mockReturnValue(false);
    jest.spyOn(Player.prototype, "dodged").mockReturnValue(false);
    const winner = play([a, b]);
    expect(winner).toBeTruthy();
    spy.mockRestore();
  });
});
