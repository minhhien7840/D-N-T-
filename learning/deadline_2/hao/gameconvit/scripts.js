/*khu vực di chuyễn */
let canvas = document.getElementById('gamezone');
let context = canvas.getContext('2d');
// điểm số
let scoreShow = document.getElementById('score');
// hình nền cho nhân vật máp và vật cản
let vitimg = new Image();
let mapimg = new Image();
let obstacle1 = new Image();
let obstacle2 = new Image();
vitimg.src = "img/16x18/vit.png";
mapimg.src = "img/Background-img.webp";
obstacle1.src = "img/obtacleDown.jpg";
obstacle2.src = "img/obtacleUp.jpg";
canvas.width = 300;
canvas.height = 150;
//tốc độ màn
let rate = 1;
//điểm
let score = 0;
//khoảng cách 2 ống cách nhau
let disObstacle = 100;
//disObs12 khoảng cách 2 ống 1 cột
let disObs12 = 70;
let vit = {
    x: canvas.width / 10,
    y: canvas.height / 3,
    width: 16,
    height: 18,
}
let obstacle = [];
obstacle.push({
    x: canvas.width,
    y: 0,
    width: 20,
    height: 50,
    key: false,
    pass : false
})
let vitribandau_imgvit = 0;
let soluongkhung_imgvit = 12;
let rows_imgvit = 4;
let columns_imgvit = 3;


//vẽ pet
function drawvit() {
    let rowvit_index = Math.floor(vitribandau_imgvit / columns_imgvit);
    let colvit_index = vitribandau_imgvit % columns_imgvit;

    context.drawImage(vitimg, colvit_index * vit.width, rowvit_index * vit.height,
        vit.width, vit.height, vit.x, vit.y, vit.width, vit.height);

    vitribandau_imgvit = (vitribandau_imgvit + 1) % soluongkhung_imgvit;
}
//animation vit
function animationvit() {
    if (vit.x >= canvas.width) {
        vit.x = 0;
    }
    if (vit.y <= 0) {
        vit.y = 0;
    }
    if (vit.y >= 150) {
        vit.x = vit.x;
        vit.y = 50;
    }

    //vịt rơi
    vit.y += 1;
    //thay đổi vịt đi tới
    // vit.x += 0.2;
    drawvit();
    // if (vit.x == canvas.width) {
    //     endGame();
    // }
}
//vit va chạm
function isColliding(pet, obj1, obj2) {
    if (pet.x + pet.width >= obj1.x && pet.x + pet.width <= obj1.x + obj2.width) {
        if (pet.x >= obj1.x && pet.x + pet.width < obj1.x + obj1.width
            && pet.y < obj1.y + obj1.height)
            return false;
        if (pet.x + pet.width >= obj2.x && pet.x + pet.width <= obj2.x + obj2.width
            && pet.y + pet.height > obj2.y)
            return false;
    }
    return true;
}
//ve obstacle
function drawobstacle() {
    for (let index = 0; index < obstacle.length; index++) {
        let curobs = obstacle[index];
        //dat bien cho phan tu vat can
        // do dai ong duoi bang ong tren + khoang cach 2 ong
        context.drawImage(obstacle1, curobs.x, curobs.y,
            curobs.width, curobs.height);
        context.drawImage(obstacle2, curobs.x, curobs.y + curobs.height + disObs12,
            curobs.width, canvas.height - curobs.height - disObs12);
        // obstacle di chuyễn
        curobs.x -= rate;
        //////////////////////
        let random = Math.random();
        if ((curobs.x) <= (canvas.width / 3) * 2 && curobs.pass==false) {
            curobs.pass = true;
            let randomHeight = Math.floor(random * (canvas.height / 2))
            obstacle.push({
                x: canvas.width,
                y: 0,
                width: 20,
                height: randomHeight,
                key: false,
                pass:false
            })
           
        }
        if (curobs.x + curobs.width <= vit.x && !curobs.key) {
            score += 10;
            scoreShow.innerHTML = "score: " + score;
            curobs.key = true;
        }
        let obstacleTop = {
            x: curobs.x,
            y: curobs.y,
            width: curobs.width,
            height: curobs.height
        };
        let obstacleBottom = {
            x: curobs.x,
            y: curobs.y + curobs.height + disObs12,
            width: curobs.width,
            height: canvas.height - curobs.height - disObs12
        };
        //end
        if (isColliding(vit, obstacleTop,obstacleBottom)==false) {
            endGame();
        }
        // cắt khi chạm biên
        if (curobs.x + curobs.width < 0) {
            obstacle.splice(index, 1);
            index--;
        }
    }
}
//score đủ 50 thì tăng tốc
let temp = 50;
function updateRate() {
    if (score == temp) {
        rate += 0.5;
        temp += 50;
    }
}
function draw() {
    context.drawImage(mapimg, 0, 0, canvas.width, canvas.height);
    animationvit();
    drawobstacle();
    updateRate();
}
//end
function endGame() {
    alert("game over");
    document.location.reload();
}
//khởi chạy canvas làm mới khi có thay đổi 
//bấm để nhảy
document.addEventListener("keydown", function () {
    vit.y -= 25;
});
function run() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    requestAnimationFrame(run);
}

run();
console.log("width" + canvas.width)
console.log("height" + canvas.height)
