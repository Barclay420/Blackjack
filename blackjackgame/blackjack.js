var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; 

var hidden;
var deck;

var canHit = true; //allows the player (you) to draw while yourSum <= 21
var balance = 50000; // Starting balance

window.onload = function() {
    buildDeck();
    shuffleDeck();
    //startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    // console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    canHit = true;
    yourSum = 0;
    dealerSum = 0;
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    buildDeck();
    shuffleDeck();
    document.getElementById("dealer-cards").innerHTML ='<img id="hidden" src="./assets/BACK.png">';
    document.getElementById("your-cards").innerHTML = "";
    console.log(document.getElementById("betting").value);
    bet = document.getElementById("betting").value;
    if (bet != "") {
        document.getElementById("betting").value = "";

        hidden = deck.pop();
        dealerSum += getValue(hidden);
        dealerAceCount += checkAce(hidden);
        // console.log(hidden);
        // console.log(dealerSum);
    
        giveDealerCard();
        for (let i = 0; i < 2; i++) {
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src = "./assets/" + card + ".png";
            yourSum += getValue(card);
            yourAceCount += checkAce(card);
            document.getElementById("your-cards").append(cardImg);
        }

        console.log(yourSum);
        document.getElementById("hit").addEventListener("click", hit);
        document.getElementById("stay").addEventListener("click", stay);
    } else {
        console.log("placebet")
    }
   
}

function hit() {
    console.log('tryckte hit');
    if (!canHit) {
        return;
    }
    console.log('can hit');

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./assets/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
        canHit = false;
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);
    while (dealerSum < 17) {
        //<img src="./cards/4-C.png">
        giveDealerCard();
    }
    console.log(dealerSum);
    

    canHit = false;
    document.getElementById("hidden").src = "./assets/" + hidden + ".png";


    bankroll = 50000;

let betAmount = 1000; // Fixed bet amount

// Function to place a bet
function placeBet() {
    if (balance < betAmount) {
      console.log("Not enough balance to place the bet.");
      return;
    }
    balance -= betAmount

    let message = "";


    if (dealerSum > 21) {
        message = "You win!";
        balance += betAmount * 2;
    } 
   else if (yourSum > 21) {
        message = "You Lose!";
        balance -= betAmount -1000;
    }
    else if (yourSum > dealerSum) {
      balance += betAmount * 2;
      console.log(`You won! New balance: ${balance}`);
    } else if(dealerSum > yourSum){
        balance -=betAmount -1000;
      console.log(`You lost. New balance: ${balance}`);
    }
    else if (yourSum == dealerSum){
        balance += betAmount;
        console.log('you Tied')
    }

   
    //both you and dealer <= 21
    if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
        message = "You won 1000"
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
        message = "you lost 1000";
    }
    if (bankroll < bet){
        message = "You don't have enoght money"
        return;
    }
    if (yourSum > 21) {
        message = "You Lose!";
        balance -= betAmount -1000;
    }
    if (dealerSum > 21) {
        message = "You win!";
        balance += betAmount * 2;
    }
  }
  
  // Place a bet
  placeBet();

    //let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum <
         dealerSum) {
        message = "You Lose!";
    }

    
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}



function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    if (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function reduceAce(dealerSum, dealerAceCount) {
    if (dealerSum > 21 && dealerAceCount > 0){
        dealerSum -= 10;
        dealerAceCount -= 1;
    }
    return dealerSum;
}


function giveDealerCard() {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./assets/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
}