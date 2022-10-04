let deckID = ""
let playerScore = 0
let computerScore = 0
const deckValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]

const resultMessage = document.getElementsByTagName("h1")[0]
const remainingCardsEl = document.getElementById("remaining-cards-count")
const deckBtn = document.getElementById("get-deck-btn")
const cardsBtn = document.getElementById("get-cards-btn")
const computerScoreElement = document.getElementById("computer-score")
const playerScoreElement = document.getElementById("player-score")

deckBtn.addEventListener('click', drawDeck)
cardsBtn.addEventListener('click', drawCards)

function drawDeck() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            deckID = data.deck_id
            cardsBtn.disabled = false
            remainingCardsEl.innerHTML = `${data.remaining}`
            resultMessage.textContent = "War!"
            playerScore = 0
            computerScore = 0
            computerScoreElement.textContent = computerScore
            playerScoreElement.textContent = playerScore
            document.getElementById("img-cards-container").innerHTML = `
                <div class="card-slot"></div>
                <div class="card-slot"></div>`
        })
            
}

function drawCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckID}/draw/?count=2`)
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("img-cards-container").children[0].innerHTML = `
                <img src=${data.cards[0].image}>`
            document.getElementById("img-cards-container").children[1].innerHTML = `
                <img src=${data.cards[1].image}>`

                let result = compareCards(data.cards[0], data.cards[1])
                if(result == 1){
                    computerScore++
                    computerScoreElement.textContent = computerScore
                }else if (result == 2){
                    playerScore++
                    playerScoreElement.textContent = playerScore
                }

            remainingCardsEl.innerHTML = `${data.remaining}`

            if(data.remaining == 0){
                cardsBtn.disabled = true
                if(playerScore > computerScore){
                    resultMessage.textContent = "The player Won!"
                }else if(playerScore < computerScore){
                    resultMessage.textContent = "The computer Won!"
                }else{
                    resultMessage.textContent = "It's a draw!"
                }
            }
        })
}

function compareCards (card1, card2) {
    const value1 = deckValues.indexOf(card1.value)
    const value2 = deckValues.indexOf(card2.value)
    if (value1 > value2) {
        return 1
    }else if (value1 < value2) {
        return 2
    }else{
        return 0
    }
}