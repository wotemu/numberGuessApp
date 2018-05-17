// Game Function:
// -  Player must guess a number between min and max
// -  players get a certain amount of guesses
// -  Notify player of guesses remaining
//-  Notify player the correct answer if looses
// -  Let player choose to play again

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

    //UI elements
    const game = document.querySelector('#game'),
          minNum = document.querySelector('.min-num'),
          maxNum = document.querySelector('.max-num'),
          guessBtn = document.querySelector('#guess-btn'),
          guessInput = document.querySelector('#guess-input'),
          message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'paly-again'){
    window.location.reload();
  }
});

//litsen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  //validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }else{
    //check if won
    if(guess === winningNum){
      //gameover won
      gameOver(true, `${winningNum} is correct, YOU WIN`);

    }else{
      //wrong guess
      guessesLeft -= 1;

      if(guessesLeft === 0){
        //gameover, loss

        gameOver(false, `Game Over, you lost. The correct number was ${winningNum} `);

      }else{
        //Game continues - answer wrong

        //Change border color
        guessInput.style.borderColor = 'red';

        //clear Input
        guessInput.value = '';

        //tell user its number is wrong
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      }
    }
  }

});


//Game Over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green': color = 'red';
  //disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  //set text color
  message.style.color = color;

  //let the user know they won, gameover, won
  setMessage(msg);

  //paly again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}


//Get winning number
function getRandomNum(min, max){
  return Math.floor(Math.random()* (max-min+1)+min);
}
//setMessage
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}
