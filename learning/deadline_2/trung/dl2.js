const playerText= document.getElementById("player");
const comText= document.getElementById("com");
const rs= document.getElementById("rs");

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissor = document.getElementById('scissor');
const choice = [rock, paper,scissor];

const arr= [[0,-1,1] ,[1,0,-1], [-1,1,0]];

function rule(x){
    // player choice
    choice[x].style.backgroundColor= "red";
    playerText.textContent += choice[x].textContent;
    for (let i = 0; i < choice.length; i++) {
        choice[i].disabled=true;
    }
    
    // computer choice
    let comChoice = Math.floor(Math.random()* choice.length);
    choice[comChoice].style.backgroundColor= "yellow";
    comText.textContent += choice[comChoice].textContent;

    // how to win or lose or draw
    if (arr[x][comChoice]== 0) {
        rs.textContent+= "Draw ";
    } else if(arr[x][comChoice]== 1){
        rs.textContent+= "Win ";
    } else{
        rs.textContent+= "Lose ";
    }
}

// reset lai cac lua chon ve ban dau
function reset(){
    rs.textContent = "Result:";
    comText.textContent= "Computer choice: ";
    playerText.textContent= "Player choice: ";
    for (let i = 0; i < choice.length; i++) {
        choice[i].style.backgroundColor= "grey";
        choice[i].disabled=false;
    }
}





