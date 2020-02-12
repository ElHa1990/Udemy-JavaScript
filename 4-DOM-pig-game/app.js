/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
DOM --> Document Object Model. Global object van de browser.
/HTML webpage content is stored in the DOM which then can be accesed or manipulated by JavaScript.
Event: notifications are send to notify the code that something happened on the webpage.
For example: clicking a button, resizing window, scrolling down or up and pressing a key. 
Event listeners: functions that performs an action based on a certain event. It waits for an event to happen. 
State variable: tells us the condition of a system.
*/




/***********************************
The Pig Game
***********************************/

var scores, roundScore, activePlayer, gamePlaying;

startGame();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if(gamePlaying) {
        // 1. random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. update round score if roll number is NOT 1. 
        if (dice !== 1) {
            // add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // next player
            nextPlayer ();   
        }
          
    }

}); // add function into eventlistener is called anonymous. Has no name and can't be used outside this funcion.

document.querySelector('.btn-hold').addEventListener('click', function () {
    
    if (gamePlaying) {
    // add current score to global score
        scores[activePlayer] += roundScore;
        
        // update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            // next player
        nextPlayer ()
        }; 
    }
   
});

document.querySelector('.btn-new').addEventListener('click', startGame);

function startGame () {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

function nextPlayer () {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        
    // reset scores to 0
    roundScore = 0;
    document.getElementById('current-0'). textContent = '0';
    document.getElementById('current-1'). textContent = '0';

    // change the active player looks
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
};








// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

// var x = document.querySelector('#score-0').textContent;
// console.log(x);




























