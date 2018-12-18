let state = {
    letter: "",
    guesses: 0,
    wins: 0,
    losses: 0,
    guessesSoFar: []
}

let renderEvent = new Event('render')

function reset() {
    state.guesses = 9
    const letters = "abcdefghijklmnopqrstuvwxyz".split("")
    let randomNumber = Math.floor(Math.random() * Math.floor(letters.length))
    state.letter = letters[randomNumber]
    state.guessesSoFar = []
}

function render() {
    const winsElem = document.getElementById('win')
    const loseElem = document.getElementById('lose')
    const guessLeftElem = document.getElementById('guess-left')
    const guessElem = document.getElementById('guess')

    winsElem.textContent = "Wins: " + state.wins
    loseElem.textContent = "Losses: " + state.losses
    guessLeftElem.textContent = "Guesses left: " + state.guesses
    guessElem.textContent = "Your Guesses so far: " + state.guessesSoFar
}

document.addEventListener('render', render)

window.onload = () => {
    // set initial game state
    reset()
    // render initial score html
    render()

    document.addEventListener('keypress', (event) => {
        // guess right
        if (event.key === state.letter) {
            state.wins++
            reset()
        } else { // guess wrong
            state.guesses--
            state.guessesSoFar.push(event.key)
        }
        // run out of guesses
        if (state.guesses <= 0) {
            state.losses++
            reset()
        }

        document.dispatchEvent(renderEvent)
    })
}
