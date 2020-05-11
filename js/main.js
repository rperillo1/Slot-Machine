/*----- constants -----*/
const slotImage = [
    '<i class="fab fa-evernote" style="color: rgb(255, 213, 0)"></i>',
    '<i class="fas fa-hippo" style="color: rgb(255, 65, 65)"></i>',
    '<i class="fas fa-frog" style="color: rgb(251, 60, 254)" ></i>',
    '<i class="fas fa-fish" style="color: rgb(255, 140, 0)"></i>',
    '<i class="fas fa-otter" style="color:rgb(141, 174, 100)"></i>',
    '<i class="fab fa-mailchimp" style="color:rgb(47, 106, 255)"></i>', 
]

const wilds = [
    '<i class="fas fa-dollar-sign" style="color:rgb(34, 171, 27)"></i>',
    '<i class="fas fa-skull-crossbones" style="color:rgb(0, 0, 0)"></i>'
]

/*----- app's state (variables) -----*/
let bet;
let coins;
let slots;

/*----- cached element references -----*/
let spinBtn = document.querySelector('#spin-btn button')
let coinSpan = document.querySelector('#coins div > span')
let betInput = document.querySelector('#input-bet')
let slotLeft = document.querySelector('#left')
let slotCenter = document.querySelector('#center')
let slotRight = document.querySelector('#right')
let displayMsg = document.querySelector('#display-msg')


/*----- event listeners -----*/
spinBtn.addEventListener('click', spin)

/*----- functions -----*/
init()

function init() {
    bet = 25;
    coins = 500;
    renderMoney()
}

function renderMoney(){
    coinSpan.textContent = coins;
    betInput.value = bet;
}


function spinAnimation(){
    spinBtn.disabled = true;
    let time = 100;
    let time2 = 900;
    let time3 = 1800;
    for (let i = 0; i < 12; i++) {
        setTimeout(function() {
            slotLeft.innerHTML = slotImage[randIdx()];
        }, time);
        time+=75
    }
    for (let i = 0; i < 12; i++) {
        setTimeout(function() {
            slotCenter.innerHTML = slotImage[randIdx()];
        }, time2);
        time2+=75
    }
    for (let i = 0; i < 12; i++) {
        setTimeout(function() {
            slotRight.innerHTML = slotImage[randIdx()];
        }, time3);
        time3+=75
    }
    setTimeout(function() {
        slots = [slotLeft.innerHTML.toString(), slotCenter.innerHTML.toString(), slotRight.innerHTML.toString()]
    }, 2705)
}

function spin() {
    if (coins <= 0) {
        spinBtn.disabled = true;
        displayMsg.textContent = "YOU'RE BROKE";
        return;
    }
    bet = parseInt(Math.floor(betInput.value))
    if (bet > coins) {
        displayMsg.textContent = "LOWER YOUR BET";
        return;
    }
    addWildsToArray()
    spinAnimation()
    setTimeout(function(){
        checkMatch()
        renderMoney()
        if (slotImage.length > 6) {
            removeWildFromArray()
        }
        spinBtn.disabled = false;
    }, 2710);
}

function checkMatch() {
    if (!checkForWild()) {
        matchCount()
    }
}

function matchCount() {
    if (slots[0] === slots[1] && slots[1] === slots[2]) {
        displayMsg.textContent = `YOU WON ${bet*4}`
        coins+=bet*4;
    }
    else if (slots[0] === slots[1] || slots[1] === slots[2]) {
        displayMsg.textContent = `YOU WON ${bet*2}`
        coins+=bet*1.5;
    }
    else {
        displayMsg.textContent = 'YOU LOSE'
        coins-=bet;
    }
}


function checkForWild(){
    let count = 0;
    console.log(typeof slots[0])
    for (let i = 0; i < slots.length; i++) {
        if (slots[i].includes('fa-dollar-sign')) {
            count++;
        }
        if (slots[i].includes('fa-skull-crossbones')) {
            count=4;
        }
    }
    if (count === 1) {
        displayMsg.textContent = `YOU WON ${bet*2}`
        coins+=bet*2
        return true;
    }
    if (count === 2) {
        displayMsg.textContent = `YOU WON ${bet*4}`
        coins+=bet*4
        return true;
    }
    if (count === 3) {
        displayMsg.textContent = `YOU WON ${bet*6}`
        coins+=bet*6
        return true;
    }
    if (count === 4) {
        displayMsg.textContent = 'YOU LOSE'
        coins-=bet
        return true;
    }
    return false;
}


function randIdx() {
    return Math.floor(Math.random() * slotImage.length);
}

function addWildsToArray() {
    let randWild = Math.floor(Math.random() * 100)
    if (randWild >= 50 && randWild <= 80) {
        slotImage.push(wilds[0])
    }
    else if (randWild >= 81 && randWild <= 100) {
        slotImage.push(wilds[1])
    }
}

function removeWildFromArray(){
    slotImage.pop()
}

