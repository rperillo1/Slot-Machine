/*----- constants -----*/
const slotImage = [
    '<i class="fab fa-evernote" style="color: rgb(255, 213, 0)"></i>',
    '<i class="fas fa-hippo" style="color: rgb(255, 65, 65)"></i>',
    '<i class="fas fa-frog" style="color: rgb(251, 60, 254)" ></i>',
    '<i class="fas fa-fish" style="color: rgb(255, 140, 0)"></i>',
    '<i class="fas fa-otter" style="color:rgb(141, 174, 100)"></i>',
    '<i class="fab fa-mailchimp" style="color:rgb(47, 106, 255)"></i>',
    '<i class="fas fa-skull-crossbones" style="color:rgb(0, 0, 0)"></i>',
    '<i class="fas fa-dollar-sign" style="color:rgb(34, 171, 27)"></i>'  
]

const wildWin = '<i class="fas fa-dollar-sign" style="color:rgb(34, 171, 27)"></i>'
const wildLose = '<i class="fas fa-skull-crossbones" style="color:rgb(0, 0, 0)"></i>'

/*----- app's state (variables) -----*/
let bet;
let coins;
let slots;

/*----- cached element references -----*/
let spinBtn = document.querySelector('#spin-btn button')
let coinSpan = document.querySelector('#coins div > span')
let slotLeft = document.querySelector('#left')
let slotCenter = document.querySelector('#center')
let slotRight = document.querySelector('#right')


/*----- event listeners -----*/
spinBtn.addEventListener('click', spin)

/*----- functions -----*/
init()

function init() {
    bet = 25;
    coins = 500;
    render()
}

function render(){
    coinSpan.textContent = coins;
    slotLeft.innerHTML = slotImage[randNum()];
    slotCenter.innerHTML = slotImage[randNum()];
    slotRight.innerHTML = slotImage[randNum()];
    slots = [slotLeft.innerHTML, slotCenter.innerHTML, slotRight.innerHTML]
}


function spin() {
    render()
    checkMatch()

}

function checkMatch() {
    checkForWild()
    threeInRow()
}

function threeInRow() {
    for (let i = 0; i < slots.length; i++) {
        if (slots[0] === slots[1]) {
            if (slots[1] === slots[2]) {
                console.log('win bucks')
            }
        }
    }
}


function checkForWild(){
    let count = 0;
    for (let i = 0; i < slots.length; i++) {
        if (slots[i] === wildWin) {
            count++
        }
    }
    if (count === 1) {
        console.log('win bucks')
    }
    if (count === 2) {
        console.log('win bigger bucks')
    }
    if (count === 3) {
        console.log('win huge bucks')
    }
}


function randNum() {
    return Math.floor(Math.random() * slotImage.length);
}
