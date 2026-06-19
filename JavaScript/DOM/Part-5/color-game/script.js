const main = document.querySelector("main");
const box = document.querySelector(".box");
// const innerBox = document.querySelector(".inner-box");
const startButton = document.querySelector("#start-btn");
const timer = document.querySelector("#clock");
const gameOver = document.querySelector(".overlay");
const score = document.querySelector("#points");
const countDownTimer = document.querySelector("#countdown-timer");

const innerRandomBox = document.createElement("div");
innerRandomBox.classList.add("inner-box");

let time = 0;
let interval;
let points = 0;
let countDownInterval;
let isClickable = true;
const randomBox = () =>{
    box.append(innerRandomBox);
    let boxHeight = box.clientHeight - innerRandomBox.offsetHeight;
    let boxWidth = box.clientWidth - innerRandomBox.offsetWidth;
    let rX = Math.random() * boxWidth;
    let rY = Math.random() * boxHeight;
    innerRandomBox.style.backgroundColor = randomColors();
    innerRandomBox.style.top = `${rY}px`;
    innerRandomBox.style.left = `${rX}px`;
//     innerRandomBox.style.top = `${rY}%`;
//     innerRandomBox.style.left = `${rX}%`;
    isClickable = true;
}

const randomColors = () =>{
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);

    return `rgb(${r},${g},${b})`;
}

startButton.addEventListener("click",()=>{
    if (startButton.disabled) return;
    startButton.disabled = true;
    clearInterval(interval);
    randomBox();
    interval = setInterval(()=>{
        randomBox();
        time+=1;
        timer.textContent = time;
    },1000);
    
    setTimeout(()=>{
        clearInterval(interval);
        gameOver.style.display = "flex";
        let countDown = 3;
        countDownInterval = setInterval(()=>{
            countDown--;
            countDownTimer.textContent = countDown;
            if(countDown<0){
                clearInterval(countDownInterval);
                gameOver.style.display = "none";
                time = 0;
                points = 0;
                timer.textContent = 0;
                score.textContent = 0;
                startButton.disabled = false;
            };
        },1000);
    },10000);
});

innerRandomBox.addEventListener("click",()=>{
    if(!isClickable) return;
    points+=1;
    score.textContent = points;
    isClickable = false;
})


// 1. Hide Game Over after 3 seconds and resets the timer and the score.
// 2. Don't count score if user click the more than one time the inner box.