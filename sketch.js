let fairy;
let fImg;
let bImg;
let eImg;
let endImg;
let enemies = [];
let score=0;
let font;
let offsetX = 0;
let soundClassifier;
const ENEMY_SIZE = 350;
const FAIRY_SIZE = 150;

const screens = document.querySelectorAll('.screen');

function setCurrentScreen(index) {
  hideAllScreens();
  screens[index].classList.add('screen_active');
}

function hideAllScreens() {
  screens.forEach((item) => {
    item.classList.remove('screen_active');
  });
}

const playAgainButton = document.querySelector('.game-over-menu__play-again');
playAgainButton.addEventListener('click', () => {
  setCurrentScreen(1);
  location.reload();
});

// config
const BEGIN_SCREEN_INDEX = 1;

setCurrentScreen(BEGIN_SCREEN_INDEX);

// game
function preload() {
  const options = {
    probabilityThreshold: 0.95,
  };
  soundClassifier = ml5.soundClassifier("SpeechCommands18w", options);
  fImg = loadImage("img/3.gif");
  bImg = loadImage("img/bg_m_1.jpg");
  eImg = loadImage("img/mouse.gif");
  endImg= loadImage("img/gm.jpg");
}

function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent(screens[1]);
  fairy = new Fairy({
    initialCords: [50, window.innerHeight],
    size: FAIRY_SIZE,
    gravity: 10,
    rangeY: [0, window.innerHeight - FAIRY_SIZE]
  });
  soundClassifier.classify(getVoiceCommand);
}

function keyPressed() {
  if (key == " ") {
    fairy.jump();
  }
}


function draw() {
  if (random(1) < 0.01) {
     enemies.push(new Enemy({
       initialCords: [window.innerWidth, random(ENEMY_SIZE, window.innerHeight)],
       speed: 7,
       size: ENEMY_SIZE
     }));
  }
 image(bImg,offsetX, 0, width, height);
 image(bImg,offsetX + width, 0, width, height);

 offsetX--;
 if(offsetX <= -width){
  offsetX = 0;	
 }
  for (let e of enemies) {
    e.move();
    e.show();
    if (fairy.isHits(e)) {
      showGameOver();
    }
  }

  
  enemies = enemies.filter((enemy) => {
    if (enemy.x < -ENEMY_SIZE) {
      score++;
      return false;
    }

    return true;
  });

  fairy.show();
  fairy.move();

  showScore();
}

function showGameOver() {
  setCurrentScreen(2);
  
  noLoop();
}

function showScore() {
  fill(45,22,200);
  textSize(20);
  text('SCORE:' + score,20,25);
}

function getVoiceCommand(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results[0].label, results[0].confidence);
  if (results[0].label == "up") {
    fairy.jump();
  }
}