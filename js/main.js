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
    renderImages()
    renderMoney()
}

function renderMoney(){
    coinSpan.textContent = coins;
    betInput.value = bet;
}

function renderImages() {
    slotLeft.innerHTML = slotImage[randIdx()];
    slotCenter.innerHTML = slotImage[randIdx()];
    slotRight.innerHTML = slotImage[randIdx()];
    slots = [slotLeft.innerHTML, slotCenter.innerHTML, slotRight.innerHTML]
}


function spin() {
    bet = parseInt(betInput.value)
    renderImages()
    addWildsToArray()
    checkMatch()
    renderMoney()
    if (slotImage.length > 6) {
        removeWildFromArray()
    }
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
    console.log('bet', bet)
    console.log('coins', coins)
}


function checkForWild(){
    let count = 0;
    for (let i = 0; i < slots.length; i++) {
        if (slots[i] === wilds[0]) {
            count++;
        }
        if (slots[i] === wilds[1]) {
            count=4;
        }
    }
    if (count === 1) {
        displayMsg.textContent = `YOU WON ${bet*2}`
        coins+=bet*2
        return true;
    }
    if (count === 2) {
        console.log('win bigger bucks')
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
    if (randWild >= 80 && randWild <= 90) {
        slotImage.push(wilds[0])
    }
    else if (randWild >= 91 && randWild <= 100) {
        slotImage.push(wilds[1])
    }
}

function removeWildFromArray(){
    slotImage.pop()
}
