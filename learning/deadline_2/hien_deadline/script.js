
const btns = document.getElementsByClassName('btn');
// reset button
const resetBtn = document.getElementById('reset-btn');
// result
const userChoosen = document.getElementById('userChoose');
const comChoosen = document.getElementById('comChoose');
const result = document.getElementById('result');
const choice = ["Rock", "Papper", "Scissors"]
const backGroundChoice = ["hsl(200, 100%, 50%)", "cyan", "red", "green"]
/**
 * 3 đỉnh : rock, papper, scissors
 * 0: rock
 * 1: papper
 * 2: scissors
 * => 0,1:-1 ,0,2:1
 *  tương tự
 */
const choiceMatrix = [
    [0, -1, 1],
    [1, 0, -1],
    [-1, 1, 0]
];
const comDecide = () => {
    return Math.floor(Math.random() * btns.length);
}
const userDecide = () => {
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', () => {
            let comChoice = comDecide();
            yourChoice(i, comChoice);
            for (let btn of btns) {
                btn.classList.remove('btn-hover');
            }
            disabledBtn(true)
            winner(i, comChoice);
        });
    }
}
const winner = (i, j) => {
    if (choiceMatrix[i][j] == 1) {
        result.innerText = "You win";
    }
    else if (choiceMatrix[i][j] == -1) {
        result.innerText = "You lose";
    }
    else {
        result.innerText = "It's a tie";
        btns[i].style.backgroundColor = backGroundChoice[3];
    }
}
const yourChoice = (i, j) => {
    userChoosen.innerText = getChoice(i);
    comChoosen.innerText = getChoice(j);
    btns[i].style.backgroundColor = backGroundChoice[1];
    btns[j].style.backgroundColor = backGroundChoice[2];
}
const getChoice = (i) => {
    return choice[i];
}
const reset = () => {
    resetBtn.addEventListener('click', () => {
        userChoosen.innerText = "";
        comChoosen.innerText = "";
        result.innerText = "";
        for (let btn of btns) {
            btn.style.backgroundColor = backGroundChoice[0];
            btn.classList.add('btn-hover');
             
        }
        disabledBtn(false)
    });
}
const disabledBtn=(flag)=>{
    for (let btn of btns) {
        btn.disabled = flag;
    }
}
userDecide()
reset()