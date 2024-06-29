let isGameStarted = false;
let playerSts = document.querySelector('.playerStatus');
let cells = document.querySelectorAll('.outerTictactoe > button');
let resetbtn = document.querySelector('.reset');
let Oturn;

window.addEventListener('keypress',()=>{
    if(isGameStarted == false){
        console.log('game starts');
        isGameStarted = true;
        let FirstPlayer = Math.floor(Math.random()*2);
        if(FirstPlayer == 0) Oturn = true;
        else Oturn = false;
        playerSts.innerText = (Oturn)? "Player : O" : "Player : X";
        activateButtons();
    }
});

function logic(event){
    let cell = event.target;
    if(Oturn == true){
        cell.innerText = 'O'
        Oturn = false;
    }else{
        cell.innerText = 'X';
        Oturn = true;
    }
    cell.disabled = true;
    let isOver = checkWinner();
    if(isOver){
        playerSts.innerText = (!Oturn)? `Player O 
        WINNER` : `Player X
        WINNER`;
        for(cell of cells) cell.disabled = true;
    }else playerSts.innerText = (Oturn)? "Player : O" : "Player : X";
}

function activateButtons(){
    cells.forEach((cell)=>{
        cell.addEventListener('click',logic);
    });
};

resetbtn.addEventListener('click',()=>{
    if(isGameStarted)
    resetGame();
})
function resetGame(){
    console.log('game reset');
    isGameStarted = false;
    for(cell of cells){
        cell.innerText = '';
        cell.disabled = false;
        cell.removeEventListener('click',logic);
        cell.style.backgroundColor = '#FDFFD2';
        // cell.style.backgroundColor:hover;
        cell.style.color = '#667BC6';
    }
    playerSts.innerText = "Press any key to start the Game";

}
const winnigPattern =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function checkWinner(){
    for(let pattern of winnigPattern){
        let val1 = cells[pattern[0]].innerText;
        let val2 = cells[pattern[1]].innerText;
        let val3 = cells[pattern[2]].innerText;
        if(val1 != '' && val2 != "" && val3 != ""){
            if(val1 == val2 && val2 == val3){
                cells[pattern[0]].style.backgroundColor = 'skyblue';
                cells[pattern[0]].style.color = 'black';
                cells[pattern[1]].style.backgroundColor = 'skyblue';
                cells[pattern[1]].style.color = 'black';
                cells[pattern[2]].style.backgroundColor = 'skyblue';
                cells[pattern[2]].style.color = 'black';
                return true;  
            } 
        }
    }
    return false;
}
