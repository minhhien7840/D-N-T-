let xp = 0;
let health = 100;
let gold = 50;
let atk = 20; // Sát thương ban đầu
let monsters = [
    { name: "Slime", health: 10, atk: 5, xpReward: 2, goldReward: 5 },
    { name: "Fanged Beast", health: 20, atk: 10, xpReward: 5, goldReward: 10 },
    { name: "Dragon", health: 300, atk: 50, xpReward: 50, goldReward: 100 }
];

let originalMonsters = JSON.parse(JSON.stringify(monsters)); // Lưu trữ thông số quái vật ban đầu
let currentMonster = null; // Biến lưu quái vật hiện tại

function showMonsterInfo(monsterName, health) {
    const monsterInfo = document.querySelector('.monster__infor');
    monsterInfo.style.display = 'block';  // Hiện thông tin quái vật
    monsterInfo.innerHTML = `Monster name: ${monsterName} &nbsp;&nbsp; Health: ${health}`;
}

function hideMonsterInfo() {
    const monsterInfo = document.querySelector('.monster__infor');
    monsterInfo.style.display = 'none';  // Ẩn thông tin quái vật
}

function updateParameters() {
    document.getElementById('xp').innerText = `XP: ${xp}`;
    document.getElementById('health').innerText = `Health: ${health}`;
    document.getElementById('gold').innerText = `Gold: ${gold}`;
    document.getElementById('atk').innerText = `ATK: ${atk}`;
}

function resetMonster() {
    if (currentMonster) {
        let index = monsters.findIndex(monster => monster.name === currentMonster.name);
        if (index !== -1) {
            monsters[index].health = originalMonsters[index].health; // Khôi phục sức khỏe quái vật
        }
    }
    currentMonster = null; // Đặt lại quái vật hiện tại
}

function goToTownSquare() {
    document.getElementById('gameText').innerText = 'You are in the town square. You see a sign that says "Store".';
    document.querySelector(".card__button").innerHTML = `
        <button onclick="goToStore()">Go to store</button>
        <button onclick="goToCave()">Go to cave</button>
    `;
    resetMonster(); // Đặt lại quái vật khi quay về thị trấn
}

function run() {
    goToTownSquare();
}

function replay() {
    goToTownSquare();
    xp = 0;
    health = 100;
    gold = 50;
    atk = 20;
    resetMonster();
    updateParameters();
}

function goToStore() {
    document.getElementById('gameText').innerText = 'You enter the store.';
    document.querySelector(".card__button").innerHTML = `
        <button onclick="buyHealth()">Buy 10 health (10 gold)</button>
        <button onclick="buyWeapon()">Buy weapon (30 gold)</button>
        <button onclick="goToTownSquare()">Go to Town Square</button>
    `;
}

function buyHealth() {
    if (gold < 10) {
        document.getElementById('gameText').innerText = `You do not have enough gold to buy health:<<`;
    } else {
        gold -= 10;
        health += 10;
        document.getElementById('gameText').innerText = `You bought health successfully!`;
        updateParameters();
    }
}

function buyWeapon() {
    if (gold < 30) {
        document.getElementById('gameText').innerText = `You do not have enough gold to buy weapon:<<`;
    } else {
        gold -= 30;
        atk += 30;
        document.getElementById('gameText').innerText = `You bought weapon successfully!`;
        updateParameters();
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function goToCave() {
    document.getElementById('gameText').innerText = 'You enter the cave. You see some monsters.';
    document.querySelector(".card__button").innerHTML = `
        <button onclick="fightMonster(0)">Fight Slime</button>
        <button onclick="fightMonster(1)">Fight Fanged Beast</button>
        <button onclick="fightMonster(2)">Fight Dragon</button>
        <button onclick="goToTownSquare()">Go to Town Square</button>
    `;
}

function fightMonster(index) {
    currentMonster = monsters[index]; // Chọn quái vật dựa trên index
    showMonsterInfo(currentMonster.name, currentMonster.health); // Hiển thị thông tin quái vật
    document.getElementById('gameText').innerText = `You are fighting with ${currentMonster.name}!`;
    document.querySelector(".card__button").innerHTML = `
        <button onclick="attackMonster()">Attack</button>
        <button onclick="dodgeMonster()">Dodge</button>
        <button onclick="run()">Run</button>
    `;
}

function attackMonster() {
    // Randomized player attack damage (between 80% to 120% of base attack)
    let playerDamage = getRandom(atk * 0.8, atk * 1.2);
    currentMonster.health -= playerDamage; // Subtract randomized damage from monster health

    if (currentMonster.health <= 0) {
        hideMonsterInfo();
        document.getElementById('gameText').innerText = `You defeated the ${currentMonster.name}!`;
        gold += currentMonster.goldReward; // Reward player with gold
        xp += currentMonster.xpReward; // Reward player with XP
        resetMonster(); // Reset the monster state
        document.querySelector(".card__button").innerHTML = `
            <button onclick="goToTownSquare()">Go to Town Square</button>
        `;
        updateParameters(); // Update player's stats (XP, gold)
        return; // Stop further execution if monster is defeated
    }

    // Randomized monster attack damage (between 50% to 100% of monster attack)
    let monsterDamage = getRandom(currentMonster.atk * 0.5, currentMonster.atk);
    health -= monsterDamage; // Subtract randomized damage from player health

    if (health <= 0) {
        hideMonsterInfo();
        document.getElementById('gameText').innerText = `You died:<<<<`;
        document.querySelector(".card__button").innerHTML = `<button onclick="replay()">Replay</button>`;
        updateParameters(); // Update player's health to 0 or death status
        return; // Stop further execution if player dies
    }

    // Show updated monster info and player stats
    showMonsterInfo(currentMonster.name, currentMonster.health);
    updateParameters();
}

function dodgeMonster() {
    document.getElementById('gameText').innerText = `You dodged the attack!`;
}

// Khởi tạo ẩn thông tin quái vật và cập nhật thông số
hideMonsterInfo();
updateParameters();
