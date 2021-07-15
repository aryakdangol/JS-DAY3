//alert("Hello")

function age(){
    let birthYear = prompt("Enter the year you were born in");
    let ageInDays = (2021 - birthYear) * 365;
    console.log(ageInDays);
    let h1 = document.createElement('h1');
    let ans = document.createTextNode('You are ' + ageInDays + ' old.');
    h1.setAttribute('id','ans');
    h1.appendChild(ans);
    document.getElementById('result-1').appendChild(h1);
}

function result(){
    document.getElementById('ans').remove();
}

function generatecat(){
    let image = document.createElement('img');
    let div = document.getElementById('cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    image.classList.add('shadow-lg','p-3')
    div.appendChild(image);
}

function rps(yourChoice){
    console.log(yourChoice);
    botChoice = randChoice();
    //console.log(botChoice)
    results = decideWinner(yourChoice.id, botChoice);
    //console.log(results);
    finalMessage = Message(results);
    //console.log(finalMessage);
    display(yourChoice.id, botChoice, finalMessage);
    
}

function randChoice(){
   let number =  Math.floor(Math.random()*3);
   return ['rock','paper','sissors'][number];
}

function decideWinner(yourChoice, botChoice){
    let outcomes = {
        'rock' : {'sissors' : 1, 'rock' : 0.5, 'paper': 0},
        'paper' :{'sissors' : 0, 'rock' : 1, 'paper': 0.5},
        'sissors' : {'sissors' : 0.5, 'rock' : 0, 'paper': 1},
    }
    let yourScore = outcomes[yourChoice][botChoice];
    let botScore = outcomes[botChoice][yourChoice];
    return [yourScore, botScore];
}


function Message(results){
    if (results[0] == 0){
        return {'message': 'You Lost', 'color': 'red'};
    }
    else if (results[0] == 0.5){
        return {'message': 'It is a draw!', 'color': 'yellow'};
    }
    else {
        return {'message' : 'You Won!' , 'color': 'green'};
    }
}

function display(yourImageChoice, botImageChoice, finalMessage){
    let images = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'sissors': document.getElementById('sissors').src,
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('sissors').remove();

    let humanImage = document.createElement('img');
    humanImage.src = images[yourImageChoice];
    humanImage.style.boxShadow = "0px 10px 50px rgba(37, 50, 223, 1)";

    let botImage = document.createElement('img');
    botImage.src = images[botImageChoice];
    botImage.style.boxShadow = "0px 10px 50px rgba(243, 38, 24, 1)";

    let MessageDiv = document.createElement('div');
    MessageDiv.innerHTML = "<h1 style = 'color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>";

    document.getElementById('rps').appendChild(humanImage);
    document.getElementById('rps').appendChild(MessageDiv);
    document.getElementById('rps').appendChild(botImage);
}


//Challenge 4

var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
for(let i = 0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function changeColor(currentButton){
    if(currentButton.value == 'red'){
        buttonsRed();
    }
    else if(currentButton.value == 'green'){
        buttonsGreen();
    }
    else if(currentButton.value == 'reset'){
        buttonsReset();
    }
    else if (currentButton.value == 'random'){
        buttonRandom();
    }
}

function buttonsRed(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsReset(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonRandom(){
    var choices = ['btn-primary','btn-danger', 'btn-success', 'btn-warning'];
    for(let i = 0; i < all_buttons.length; i++)
    {
        let random = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[random]);
    }
}



//Challenge 5: BlackJack

let blackjackGame = {
    'you' : {'scoreSpan' : '#your-score', 'div' : '#you', 'score': 0},
    'dealer' : {'scoreSpan' : '#dealer-score', 'div' : '#dealer', 'score': 0},
    'cards' : ['2', '3', '4', '5' , '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'cardsMap' : {'2' : 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8' : 8, '9': 9, '10' : 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1,11]},
    'wins': 0,
    'draw': 0,
    'losses': 0,
    'isStand': false,
    'turnsOver': false,
}

const you = blackjackGame['you'];
console.log(you);
const dealer = blackjackGame['dealer'];

document.querySelector('#hit').addEventListener('click', blackjackHit);
document.querySelector('#stand').addEventListener('click', blackjackStand);
document.querySelector('#deal').addEventListener('click', blackjackDeal);


const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/crash.mp3');
const lossSound = new Audio('sounds/aww.mp3');


function blackjackHit(){
    if (blackjackGame['isStand'] === false)
    {
        let card = randomCard();
        console.log(card);
        showCard(you, card);
        updateScore(card, you);
        showScore(you);
    }
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function blackjackStand(){
    blackjackGame['isStand'] = true; 

    while(dealer['score'] < 16 && blackjackGame['isStand'] === true)
    {
        let card = randomCard();
        console.log(card);
        showCard(dealer, card);
        updateScore(card, dealer);
        showScore(dealer);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}

function showCard(activePlayer, card){
    if(activePlayer['score'] <= 21)
    {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsOver'] === true)
    {
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#you').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer').querySelectorAll('img');
    
        for(let i = 0; i < yourImages.length; i++)
        {
            yourImages[i].remove();
        }
        for(let i = 0; i < dealerImages.length; i++)
        {
            dealerImages[i].remove();
        }
    
        you['score'] = 0;
        dealer['score'] = 0;
        document.querySelector('#your-score').textContent = 0;
        document.querySelector('#your-score').style.color = 'black';
    
        document.querySelector('#dealer-score').textContent = 0;
        document.querySelector('#dealer-score').style.color = 'black';
    
        document.querySelector('#result').textContent = 'Lets Play';
        document.querySelector('#result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }


}




function randomCard(){
    let random = Math.floor(Math.random()* 13);
    return blackjackGame['cards'][random];
}

function updateScore(card, activePlayer){
    //for ace
    if (card == 'A'){
        console.log(blackjackGame['cardsMap'][card][1]);
        if(activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21)
        {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else
        {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';      
    }
    else
    {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']; 
    }
}

function computeWinner(){
    let winner;
    if (you['score'] <= 21)
    {
        if (you['score'] > dealer['score'] || dealer['score'] > 21)
        {
            blackjackGame['wins']++;
            winner = you;
        }
        else if (you['score'] < dealer['score'])
        {
            blackjackGame['losses']++;
            winner = dealer;
        }
        else if (you['score'] == dealer['score'])
        {
            blackjackGame['draw']++;
            console.log('DRAW');
        }
    }
    else if (you['score'] > 21 && dealer['score'] <=21)
    {
        blackjackGame['losses']++;
        winner = dealer;
    }
    else if (you['score'] > 21 && dealer['score'] > 21)
    {
        blackjackGame['draw']++;
        console.log('Draw');
    }
    return winner;
}

function showResult(winner)
{
    let message, messageColor;

    if(blackjackGame['turnsOver'] === true)
    {
        if (winner == you)
        {
            document.querySelector('#win').textContent = blackjackGame['wins'];
            message = 'You Won!';
            messageColor = 'green';
            winSound.play();
        }
        else if (winner == dealer)
        {
            document.querySelector('#loss').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        }
        else
        {
            document.querySelector('#draw').textContent = blackjackGame['draw'];
            message = 'Draw';
            messageColor = 'black';
        }
    
        document.querySelector('#result').textContent = message;
        document.querySelector('#result').style.color = messageColor;
    }


}