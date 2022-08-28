
// state 
let rowGuess = [];
let currentRowGuess = 0;
let maxRowGuess = 6;
let answer = 'trend';

// fixed
const letterKeys = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

function main() {
    listeners();
    addGuessRows(maxRowGuess);
}

function listeners() {
    window.addEventListener("keydown", keyPressHandler);
}

function createGuessRow(guessNumber) {

    const letterElements = `
        <div class="row-guess-styling row-guess-${guessNumber}">
            <div class="letter-box"></div>
            <div class="letter-box"></div>
            <div class="letter-box"></div>
            <div class="letter-box"></div>
            <div class="letter-box"></div>
        </div>
    `
    const letterRow = createElementFromHTML(letterElements);
    return letterRow
}

function addGuessRows(quantityOfGuess) {
    let centerEle = document.getElementsByClassName('center')[0]

    for (let ind = 0; ind < quantityOfGuess; ind++) {
        let newRow = createGuessRow(ind);
        centerEle.append(newRow)
        rowGuess.push([])
    }
}

function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}


function keyPressHandler(event) {
    // prevent adding more rows then game
    if (currentRowGuess >= maxRowGuess) { return }

    if (letterKeys.indexOf(event.key) !== -1 && rowGuess[currentRowGuess].length <= 5) {
        rowGuess[currentRowGuess].push(event.key.toUpperCase())
        updateScreen(currentRowGuess);
    } else if (event.key === 'Backspace') {
        rowGuess[currentRowGuess].pop()
        updateScreen(currentRowGuess)
    } else if (event.key === 'Enter') {
        if (rowGuess[currentRowGuess].length >= 5) {
            let wordGuess = rowGuess[currentRowGuess].join('').toLowerCase();
            if (wordList.indexOf(wordGuess) !== -1) {
                console.log("finish")
                checkGuess(answer, rowGuess[currentRowGuess])
                currentRowGuess += 1;
            }

        }
    }
}

function updateScreen(guess) {
    let row = document.querySelectorAll(".row-guess-" + guess + " .letter-box");

    row.forEach(function (ele, ind) {
        if (typeof rowGuess[currentRowGuess][ind] !== 'undefined') {
            ele.innerText = rowGuess[currentRowGuess][ind]
            // ele.classList.add("green-letter-guess");
            if (rowGuess[currentRowGuess].length > 4) {
                let m = checkGuess(answer, rowGuess[currentRowGuess])
                if (m[ind] !== '') {
                    ele.classList.add(m[ind])
                }
            }
        } else {
            ele.innerText = ""
        }
    })
    console.log('the guess',)
}

function checkGuess(answer, guessArray) {
    const checkGuess = [];
    answerArray = answer.toUpperCase().split('');
    guessArray.map((element, index, array) => {

        if (element === answerArray[index]) {
            console.log('green')
            checkGuess.push('green-letter-guess')

        } else if (answerArray.indexOf(element) !== -1) {
            console.log('yellow')
            checkGuess.push('yellow-letter-guess')
        } else {
            console.log('no change')
            checkGuess.push('')
        }
    })
    return checkGuess
}


main();
