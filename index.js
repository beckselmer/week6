//Started with making a card class
class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.value = this.calculateValue(rank);
    }
//used toString to string the suit and rank of the cards together
    toString() {
        return `${this.rank} of ${this.suit}`;
    }
//I was having issues with the ranks of the cards being counted so I did this switch to create value of the cards
    calculateValue(rank) {
        switch(rank) {
            case '2':
                return 2;
            case '3':
                return 3;
            case '4':
                return 4;
            case '5':
                return 5;
            case '6':
                return 6;
            case '7':
                return 7;
            case '8':
                return 8;
            case '9':
                return 9;
            case '10':
                return 10;
            case 'Jack':
                return 11;
            case 'Queen':
                return 12;
            case 'King':
                return 13;
            case 'Ace':
                return 14;
            default:
                return 0;
        }
    }
}
//created the deck class with suits and ranks    
class Deck {
    constructor() {
        this.cards = [];
        let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

        for (let suit of suits) {
            for (let rank of ranks) {
                let newCard = new Card (suit, rank);
                this.cards.push(newCard);
            }
        }
    }
//Used this shuffle called the Fisher-Yates shuffle to shuffle the deck
    shuffle() {
        console.log('Shuffling 🎲')
        let numberOfCards = this.cards.length;

        for(let i = numberOfCards - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            let temp = this.cards[i];
            [this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]];
        }
    }


//Used this deal function
    deal() {
        if(this.cards.length > 0) {
            return this.cards.pop();
        }
        return null;
        
    }
}
//Created the player class 
class Player {
    constructor(name, deck) {
        this.name = name;
        this.deck = deck;
        this.hand = [];
        this.score = 0;
        
    }
//this adds a card to the players hands
    addCard() {
        let card = this.deck.deal();
        if (card) {
            this.hand.push(card);
        }
        
    }
//plays a card
    playCard() {
        return this.hand.pop();
    }
//increases the score of the player with the better hand
    increaseScore() {
        this.score = this.score + 1;
    }
}
//making a new Deck
let deck = new Deck();
//Shuffling the deck
deck.shuffle();
//Creating the players for the game
let player1 = new Player('Player 1', deck);
let player2 = new Player('Player 2', deck);

//Adding the shuffled cards to the players hands
while (deck.cards.length > 0) {
    player1.addCard();
    player2.addCard();
}
//Starting the game, having the players keep going until they run out of cards, then stopping
let round = 1;
while (player1.hand.length > 0 && player2.hand.length > 0) {
  let card1 = player1.playCard();
  let card2 = player2.playCard();

  if(card1 === null || card2 === null) {
    break;
  }

//This increases the players scores
  if (card1.value > card2.value) {
    player1.increaseScore();
  } else if (card1.value < card2.value) {
    player2.increaseScore();
  }

  round++;
}
console.log(`Player 1 scored ${player1.score}`);
console.log(`PLayer 2 scored ${player2.score}`);
//Above is a log to show the scores of each player at the end of the game
//This prints the winner of the game or if it ends in a tie.
if (player1.score > player2.score) {
    console.log(`${player1.name} Won the War!🤘`);
} else if (player1.score < player2.score) {
    console.log(`${player2.name} Won the War!🤘`);
} else {
    console.log('The War ended in a draw, both sides are losers💩');
}