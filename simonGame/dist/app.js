let levelValue = document.querySelector("div p");
let levelCount = 0;
let compSeqeuence = [];
let userSequence = [];
let isGameStarted = false;
let highestScore = 0;
let highestScorePara = document.querySelector("h2");

document.addEventListener("keypress", function (event) {
  if (isGameStarted == false) {
    isGameStarted = true;
    buttonActivate();
    levelUp();
  }
});
function levelUp() {
  if(levelValue.classList.contains('gameOver')){
    levelValue.classList.remove('gameOver');
    levelValue.style.color = "rgb(0, 0, 0)";
  }
  levelCount++;
  levelValue.innerText = `Level : ${levelCount}`;
  let randomValue = Math.floor(Math.random() * 4 + 1);
  let btnSelected;
  if (randomValue == 1) btnSelected = document.querySelector("#btn1");
  else if (randomValue == 2) btnSelected = document.querySelector("#btn2");
  else if (randomValue == 3) btnSelected = document.querySelector("#btn3");
  else btnSelected = document.querySelector("#btn4");
  compSeqeuence.push(btnSelected.id);
  buttonFlash(btnSelected);
}

function buttonFlash(btn) {
  btn.classList.add("change");
  setTimeout(function () {
    btn.classList.remove("change");
  }, 250);
}

function buttonPressed() {
  if(isGameStarted == true){
    buttonFlash(this);
    userSequence.push(this.id);
    isSequenceSame();
  }
}

function isSequenceSame() {
  let flag = true;
  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i] == compSeqeuence[i]) continue;
    else {
      flag = false;
      break;
    }
  }
  if (flag == false) {
    setTimeout(gameOver, 500);
  } else if ((flag = true && userSequence.length == compSeqeuence.length)) {
    userSequence = [];
    setTimeout(levelUp, 1000);
  }
}

function gameOver() {
  levelValue.innerText = `Game Over!! Press any key to Start 
  SCORE = ${levelCount - 1}`;
  levelValue.classList.add('gameOver');
  levelValue.style.color = "rgb(135, 0, 0)";
  isGameStarted = false;
  userSequence = [];
  compSeqeuence = [];
  highestScore = Math.max(highestScore,levelCount-1);
  highestScorePara.innerText = `Highest Score : ${highestScore}`;
  saveData();
  levelCount = 0;
}

function buttonActivate() {
  let allButtons = document.querySelectorAll("div > div > div");
  for (btn of allButtons) {
    btn.addEventListener("click", buttonPressed);
  }
}

function saveData() {
  localStorage.setItem("highestScore", highestScore);
  localStorage.setItem("para", highestScorePara.innerText);
}
function updateData() {
  if(localStorage.getItem('highestScore') >= 0)
  highestScore = localStorage.getItem("highestScore");
  if(localStorage.getItem("para").innerHTML != null)
  highestScorePara.innerText = localStorage.getItem("para");
}
updateData();

highestScore = Math.max(highestScore,levelCount-1);
highestScorePara.innerText = `Highest Score : ${highestScore}`;

