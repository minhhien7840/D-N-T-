let xp = 0;
let health = 100;
let gold = 50;
let curnet_weapon = 0;



let xp_text = document.getElementById('xp');
let hp_text = document.querySelector('#h_person');
let gold_text = document.querySelector('#g_person');
// let hp_monster_textext = document.querySelector('#health_monster');
let health_monster_textext = document.getElementById('health_monster');
let description_text = document.querySelector('#description');
let monsterStatus = document.querySelector('#board_monster');

// default
function default_Status() {
    document.getElementById("board_monster").style.display = "none";
    xp = 0;
    health = 100;
    gold = 50;
    description_text.innerText = "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go?Use the buttons above."
    document.getElementById('xp').innerText = xp;
    document.getElementById('h_person').innerText = health;
    document.getElementById('g_person').innerText = gold;
}

class direc_location {
    constructor(location, list_btn, description) {
        this.location = location;
        this.list_btn = list_btn;
        this.description = description;
    }
}

class Monster {
    constructor(name, def, atk, hp) {
        this.name = name
        this.def = def;
        this.attack = atk;
        this.hp = hp;
    }
    attack() {
        return this.attack + Math.floor(Math.random() * 10);
    }
    defuse() {
        return this.def
    }
    clone() {
        return new Monster(this.name, this.def, this.attack, this.hp)
    }
}

class Weapon {
    constructor(name, durability, atk, def) {
        this.name = name;
        this.durability = durability;
        this.atk = atk;
        this.def = def;
    }

}

const l_btn = [document.getElementById("btn_0"), document.getElementById("btn_1"), document.getElementById("btn_2")];
// create weapon
let w1 = new Weapon('sword', 5, 90, 100);
let w2 = new Weapon('hammer', 3, 10, 10);
let w3 = new Weapon('stick', 999, 2, 5);

let inventory_text = ['stick'];
let inventory = [];
inventory.push(w2);
inventory.push(w1);
// monster
let sw = new Monster('special white Wolf', 333, 333, 333);
let w = new Monster('white Wolf', 50, 30, 50);
let b = new Monster('Bear', 80, 30, 90);
let s = new Monster('Slime', 1, 7, 3);
let d = new Monster('Dragon', 900, 2000, 300);


const s0 = [store = 'Go to store', cave = 'Go to cave', dragon = 'Fight dragon'];
const s1 = [store = 'Buy 10 Health(10 gold)', Buy_weapon = 'Buy a weapon (30 gold)', town = 'Go to town square'];
const s2 = [Slime = 'Fight Slime', Bear = 'Black Bear', town = 'Go to town square'];
const s3 = [s, b, d, sw];
const s4 = ["Attack", "Dodge", "Run"];

// model location
const vl = {
    village: new direc_location('village', s0,
        'Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above. '),
}
const sl = {
    store: new direc_location('store', s1,
        'You enter the store. '),
}
const cl = {
    cave: new direc_location('cave', s2,
        'You enter the cave. You see some monsters and some Barking of a ferocious beast'),
}
const fl = {
    cave: new direc_location('fight', s3,
        'You are fighting a monster.'),
}
const ml = {
    cave: new direc_location('fight', s3,
        'You are fighting a monster.'),
}

const term_location = vl;
const count = 0;
//  
function goTown() {
    document.getElementById("btn_0").disabled = false;
    document.getElementById("btn_1").disabled = false;
    document.getElementById("board_monster").style.display = "none";
    description_text.innerText = 'You are in the town square. You see a sign that says "Store".';
    for (let i = 0; i < l_btn.length; i++) {
        l_btn[i].innerText = s0[i];
    }

    for (let i = 0; i < l_btn.length; i++) {
        if (i === 0) {
            l_btn[i].onclick = changeToStore;
        } else if (i === 1) {
            l_btn[i].onclick = changeToCave;
        } else if (i === 2) {
            l_btn[i].onclick = function () { changeToFight("Dragon"); };
        }
    }
}
function default_mode() {
    for (let i = 0; i < l_btn.length; i++) {
        l_btn[i].innerText = s0[i];
    }

    for (let i = 0; i < l_btn.length; i++) {
        if (i === 0) {
            l_btn[i].onclick = changeToStore;
        } else if (i === 1) {
            l_btn[i].onclick = changeToCave;
        } else if (i === 2) {
            l_btn[i].onclick = function () { changeToFight("Dragon"); };
        }
    }
    default_Status()
}

function changeToStore() {
    description_text.innerText = "You enter the store.";
    for (let i = 0; i < l_btn.length; i++) {
        l_btn[i].innerText = s1[i];
    }

    for (let i = 0; i < l_btn.length; i++) {
        if (i === 0) {
            l_btn[i].onclick = buyHealth;
            // l_btn[i].onclick = null;
        } else if (i === 1) {
            l_btn[i].onclick = buy_weapon;
            // l_btn[i].onclick = null;
        } else if (i === 2) {
            l_btn[i].onclick = goTown;
        }
    }


}

function changeToCave() {
    description_text.innerText = " You enter the cave. You see some monsters and some Barking of a ferocious beast ";
    for (let i = 0; i < 2; i++) {
        l_btn[i].innerText = s3[i].name;
    }
    l_btn[2].innerText = "run";

    for (let i = 0; i < l_btn.length; i++) {
        if (i === 0) {
            l_btn[i].onclick = function () { changeToFight("Slime"); };

        } else if (i === 1) {
            l_btn[i].onclick = function () { changeToFight("Bear"); };

        } else if (i === 2) {
            l_btn[i].onclick = goTown;
        }
    }
}
function getMonster(name) {
    for (let m of s3) {
        // console.log(m.name)
        if (m.name == name) {
            return m.clone();
        }
    }
}
function changeToFight(name) {

    document.getElementById("board_monster").style.display = "flex";

    document.getElementById("monster_name").innerText = name;

    let monster = getMonster(name);

    document.getElementById("health_monster").innerText = monster.hp;

    // Cập nhật văn bản mô tả
    description_text.innerText = "You are fighting " + name;

    for (let i = 0; i < 3; i++) {
        l_btn[i].innerText = s4[i];
    }

    for (let i = 0; i < l_btn.length; i++) {
        if (i === 0) {
            l_btn[i].onclick = function () { fightType("attack", name); };
        } else if (i === 1) {
            l_btn[i].onclick = function () { fightType("dodge", name); };
        } else if (i === 2) {
            l_btn[i].onclick = goTown;

        }
    }
}
// it's have 2 types attack or dodge
function fightType(type, name) {

    let dametaken = 0;
    let monster = getMonster(name);
    dametaken = monster.attack;
    if (inventory[inventory.length - 1].durability > 0) {
        inventory[inventory.length - 1].durability -= 1;
        number = 1;
    }
    if (type == "dodge" && monster.hp > 0) {
        console.log(1)
        description_text.innerText = "you dodge compleleted an attack !"
    }
    if (type === "attack") {
        if (30 + inventory[inventory.length - 1].atk > monster.def) {
            description_text.innerText = "You kill the monster!";
            document.getElementById("btn_0").disabled = true;
            document.getElementById("btn_1").disabled = true;
            monster.hp = 0;
            health_monster_textext.innerText = monster.hp;
            xp += 20;
            xp_text.innerText = xp;
            gold += 20;
            gold_text.innerText = gold;
        } else {
            monster.hp -= (xp + 30 + inventory[inventory.length - 1].atk);
            if (monster.hp > 0) {
                description_text.innerText = "You hit the monster! It has " + monster.hp + " HP left.";
            } else {
                description_text.innerText = "It has 0 HP left.you get 20 XP and 20 golds";
                xp += 20;
                xp_text.innerText = xp;
                gold += 20;
                gold_text.innerText = gold;

            }
        }

        document.getElementById("health_monster").innerText = monster.hp;

        if (monster.hp <= 0) {
            document.getElementById("board_monster").style.display = "none";

        }
        if (health - dametaken > 0) {
            health -= dametaken;
            hp_text.innerText = health;
        } else {
            description_text.innerText = "You are dead"
            hp_text.innerText = "0 hp";
            for (let index = 0; index < l_btn.length; index++) {
                l_btn[index].innerText = "replay?";
                l_btn[index].onclick = default_mode;

            }
        }

    }
}

function buyHealth() {
    // button at position 0 for buy health
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        gold_text.innerText = gold;
        hp_text.innerText = health;
    } else if (inventory.length == 3) { } else { description_text.innerText = "not enought gold to buy"; }
}
// button at position 1 for buy health
function buy_weapon() {
    if (gold >= 30 && inventory.length < 4) {
        switch (inventory_text.length) {
            case 1:
                let newWeapon = new Weapon('hammer', 3, 10, 10);
                inventory.push(newWeapon);
                inventory_text.push(newWeapon.name);
                gold -= 30;
                gold_text.innerHTML = gold;
                break;
            case 2:
                let newWeapon_2 = new Weapon('sword', 5, 90, 100);
                inventory.push(newWeapon_2);
                inventory_text.push(newWeapon_2.name);
                gold -= 30;
                gold_text.innerHTML = gold;
                break;
            default: break;
        }
        description_text.innerText = "Inventory: " + inventory_text.join(", ");
    } else if (inventory.length >= 3) {
        description_text.innerText = "you already have the strongest weapon";
    } else {
        description_text.innerText = "not enought gold to buy";
    }
}


default_mode();


























































