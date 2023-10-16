const btn = document.querySelectorAll('.btn');
const h1 = document.querySelector('h1');
const body = document.querySelector('body');
let started = false;
let i = 0;
let userClickedPattern = [];
let gamePattern = [];
const buttonColours = ["red" ,"blue" ,"green", "yellow"];

document.addEventListener('keydown' , (e) => {
    if(!started){
        nextSequence();
        started = true;
    }
    
})

function nextSequence(){
    const randomNumber = Math.floor(Math.random()*4) ;
    const randomChosenNumber = (buttonColours[randomNumber]);
    gamePattern.push(randomChosenNumber);
    console.log(gamePattern);
    const color = document.querySelector(`#${randomChosenNumber}`);
    color.style.opacity = "0.5";
    playSound(randomChosenNumber);
    setTimeout(() => {
        color.style.opacity = "1";
    } , 100);
    h1.innerText = `Level ${++i}`;
    userClickedPattern = [];
}

for(let j of btn){
    j.addEventListener('click' , () => {
        const userChosenColour = j.id;
        userClickedPattern.push(userChosenColour);
        console.log(userClickedPattern);
        playSound(j.id);
        animatePress(j);
        j.style.opacity = "0.5";
        setTimeout(() => {
            j.style.opacity = "1";
        } , 100);
        checkAnswer(userClickedPattern.length-1);
    });
}

function playSound(name) {
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour){
    currentColour.addEventListener('click' , ()=>{
        currentColour.classList.add('pressed');
        setTimeout(() => {
            currentColour.classList.remove('pressed');
        } , 100);
    })
}

function checkAnswer(currentLevel) {
    if( gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000)
        }
    }
    else{
        var audio = new Audio(`./sounds/wrong.mp3`);
        audio.play();
        body.classList.add("game-over");
        setTimeout(()=>{
            body.classList.remove("game-over");
        })
        h1.innerText = "Game Over, Press Any Key to Restart";
        startOver();
    }
}
function startOver(){
    i = 0;
    started = false;
    gamePattern = [];
}