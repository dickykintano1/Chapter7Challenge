let midText = document.getElementById('mid-text')
let playerChoice
let comFinalChoice

class comChoices{
    constructor(element, elementImg){
        this.element = document.getElementById(element);
        this.elementImg = document.getElementsByClassName(elementImg)[0];
    }

    chosen (){
        comFinalChoice = this.element.id
        this.elementImg.style.width='120px';
        this.elementImg.style.backgroundColor='rgb(255,255,255, .5)';
        this.elementImg.style.padding = '10px';
        this.elementImg.style.borderRadius='10px';
        return(comFinalChoice)
    }

    refresh(){
        this.elementImg.style.width='';
        this.elementImg.style.backgroundColor='';
        this.elementImg.style.padding = '';
        this.elementImg.style.borderRadius='';
    }
}

let comRock = new comChoices(1, 'img com-rock')
let comPaper = new comChoices(2, 'img com-paper')
let comScissor = new comChoices(3, 'img com-scissor')

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
  
function comChoose(){
    let result = getRandomArbitrary(1,4)
    if (result == 1){
        comRock.chosen();
    } else if (result == 2){
        comPaper.chosen();
    } else{
        comScissor.chosen();
    }
}

class Result{
    constructor(text, color){
        this.text = text;
        this.color = color;
    }

    show(){
        midText.innerHTML = this.text;
        midText.style.backgroundColor = this.color;
        midText.style.color = 'white';
        midText.style.borderRadius = '25px';
        midText.style.transform = 'rotate(-30deg)';
        midText.style.fontSize = '5vw';
        midText.style.padding = '20px';
    }
}

let win = new Result('YOU WIN', 'green')
let lose = new Result('YOU LOSE', 'red')
let draw = new Result('DRAW', 'orange')


function refreshResult(){
    midText.innerHTML = "VS";
    midText.style.backgroundColor = '';
    midText.style.color = '';
    midText.style.borderRadius = '';
    midText.style.transform = '';
    midText.style.fontSize = '';
    midText.style.padding = '';

    playerImg.style.width='';
    playerImg.style.backgroundColor='';
    playerImg.style.padding = '';
    playerImg.style.borderRadius='';

    comRock.refresh();
    comPaper.refresh();
    comScissor.refresh();
}


function condition(){
    if(playerChoiceId == comFinalChoice){
        // showDraw();
        draw.show();
        disableEnable();
    } else if (playerChoiceId == '1' && comFinalChoice == '2'){
        // showLose();
        lose.show();
        disableEnable();
    } else if (playerChoiceId == '1' && comFinalChoice == '3'){
        // showWin();
        win.show();
        disableEnable();
    } else if (playerChoiceId == '2' && comFinalChoice == '1'){
        // showWin();
        win.show();
        disableEnable();
    } else if (playerChoiceId == '2' && comFinalChoice == '3'){
        // showLose();
        lose.show();
        disableEnable();
    } else if (playerChoiceId == '3' && comFinalChoice == '1'){
        // showLose();
        lose.show();
        disableEnable();
    } else if (playerChoiceId == '3' && comFinalChoice == '2'){
        // showWin();
        win.show();
        disableEnable();
    }
}

let logic = -1
function disableEnable(){
    logic = logic * -1
    if (logic == 1){
        document.getElementById('1').style.pointerEvents = 'none';
        document.getElementById('2').style.pointerEvents = 'none';
        document.getElementById('3').style.pointerEvents = 'none';
    }
    if (logic != 1){
        document.getElementById('1').style.pointerEvents = 'auto'; 
        document.getElementById('2').style.pointerEvents = 'auto'; 
        document.getElementById('3').style.pointerEvents = 'auto'; 
    }
    
}

function highlightPlayer(){
    playerImg.style.width='120px';
    playerImg.style.backgroundColor='rgb(255,255,255, .5)';
    playerImg.style.padding = '5px';
    playerImg.style.borderRadius='10px';
}

function decideResult(clicked){
    playerChoiceId = clicked.id;
    playerImg = clicked;
    highlightPlayer()
    if (playerChoiceId != 'undefined'){
        comChoose();
        condition();
    }
}

function refresh(){
    if (logic == 1){
    disableEnable();
    refreshResult();
    }   
}

decideResult()

