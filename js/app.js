
let objects = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],



    $container = $('.container'),
    $scorePanel = $('.score-panel'),
    $rating = $('.fa-star'),
    $moves = $('.moves'),
    $timer = $('.timer'),
    $restart = $('.restart'),
    $deck = $('.deck'),


    nowTime,
    allOpen = [],
    match = 0,
    second = 0,
    moves = 0,
    wait = 420,
    totalCard = objects.length / 2,

    stars3 = 14,
    stars2 = 18,
    star1 = 22;


/* This function was provided. It is supposed to shuffle the deck of cards */

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/* This function is supposed to iniate the game */

function init() {


  let allCards = shuffle(objects);
  $deck.empty();


  match = 0;
  moves = 0;
  $moves.text('0');

/* for loop to create card objects */

  for (let i = 0; i < allCards.length; i++) {
      $deck.append($('<li class="card"><i class="fa fa-' + allCards[i] + '"></i></li>'))
  }
  addCardListener();

/* start timer */

  resetTimer(nowTime);
  second = 0;
  $timer.text(`${second}`)
  initTime();
}

/* Function to give rating based on number of moves */

function rating(moves) {
  let rating = 3;
  if (moves > stars3 && moves < stars2) {
    $rating.eq(3).removeClass('fa-star').addClass('fa-star-o');
  } else if (moves > stars2 && moves < star1) {
    $rating.eq(2).removeClass('fa-star').addClass('fa-star-o');
    rating = 2;
  } else if (moves > star1) {
    $rating.eq(1).removeClass('fa-star').addClass('fa-star-o');
    rating = 1;
  }
  return { score: rating };
}

/* This function is supposed to bring up the "gameover" modal */

function gameOver(moves, score) {
  $('#winnerText').text(`In ${second} seconds, you did a total of ${moves} moves with a score of ${score}`);
  $('#winnerModal').modal('toggle');
}

$restart.bind('click', function (confirmed) {
  if(confirmed) {
    $rating.removeClass('fa-star-o').addClass('fa-star');
    allOpen = [];
    init();
  }
});

/* create card listener function, watchs for match/non-match, flips card over after click, keeps cards flipped if matched */

let addCardListener = function () {

  $deck.find('.card').bind('click', function () {
    let $this = $(this);

    if ($this.hasClass('show') || $this.hasClass('match')) { return true; }

    let card = $this.html();
    $this.addClass('open show');
    allOpen.push(card);

    if (allOpen.length > 1) {
        if (card === allOpen[0]) {
            $deck.find('.open').addClass('match');
            setTimeout(function () {
                $deck.find('.open').removeClass('open show');
            }, wait);
            match++;
    } else {
      $deck.find('.open').addClass('notmatch');
      setTimeout(function () {
        $deck.find('.open').removeClass('open show');
      }, wait / 1.5);
    }
    if (allOpen.length > 1) {
		allOpen = [];
	}
    moves++;
    rating(moves);
    $moves.html(moves);
  }

    if (totalCard === match) {
      rating(moves);
      let score = rating(moves).score;
      setTimeout(function () {
        gameOver(moves, score);
      }, 500);
    }
  });
}


function initTime() {
  nowTime = setInterval(function () {
    $timer.text(`${second}`)
    second = second + 1
  }, 1000);
}

function resetTimer(timer) {
  if (timer) {
    clearInterval(timer);
  }
}

init();
