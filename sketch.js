let fairy;
let fImg;
let bImg;
let eImg;
let enemies = [];
let score = 0;
let offsetX = 0;
let offsetXSpeed = 2;
let soundClassifier;
const ENEMY_SIZE = 350;
const FAIRY_SIZE = 150;

const backgroundAudio = new Audio("./audio/f.mp3");
const gameOverAudio = new Audio("./audio/loose.mp3");

function playAudio(audio) {
  audio.play();
  audio.addEventListener("loadeddata", () => {
    audio.pause();
    audio.play();
  });
}

function loopAudio(audio) {
  audio.play();
  audio.addEventListener("ended", () => {
    audio.play();
  });
}

function stopAudio(audio) {
  audio.pause();
}

const screens = document.querySelectorAll(".screen");

function setCurrentScreen(index) {
  hideAllScreens();
  screens[index].classList.add("screen_active");
}

function hideAllScreens() {
  screens.forEach((item) => {
    item.classList.remove("screen_active");
  });
}


const playMenuButton = document.querySelector(".play-menu__text");
playMenuButton.addEventListener("click", () => {
  setCurrentScreen(1);
  new p5(game);
});

const playAgainButton = document.querySelector(".game-over-menu__play-again");
playAgainButton.addEventListener("click", () => {
  setCurrentScreen(1);
  location.reload();
  
});

const BEGIN_SCREEN_INDEX = 0;

setCurrentScreen(BEGIN_SCREEN_INDEX);

const createUserInteractWithDocumentPromise = () => {
  const userEvents = ["click", "mousemove", "keypress"];

  return new Promise((resolve) => {
    userEvents.forEach((event) => {
      document.addEventListener(event, resolve);
    });
  });
};


// game

const game = (p5) => {
  p5.preload = () => {
    const options = {
      probabilityThreshold: 0.95,
    };
    soundClassifier = ml5.soundClassifier("SpeechCommands18w", options);
    fImg = p5.loadImage("img/3.gif");
    bImg = p5.loadImage("img/bg_m_1.jpg");
    eImg = p5.loadImage("img/mouse.gif");
  };

  p5.setup = () => {
    createUserInteractWithDocumentPromise().then(() => {
      playAudio(backgroundAudio);
      loopAudio(backgroundAudio);
    });

    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent(screens[1]);
    fairy = new Fairy({
      initialCords: [50, window.innerHeight],
      size: FAIRY_SIZE,
      gravity: 8,
      rangeY: [0, window.innerHeight - FAIRY_SIZE],
      p5,
    });
    soundClassifier.classify(getVoiceCommand);
  };

  p5.draw = () => {
    if (p5.random(1) < (0.0089 + score / 2000)) {
      enemies.push(
        new Enemy({
          initialCords: [
            window.innerWidth,
            p5.random(ENEMY_SIZE, window.innerHeight + ENEMY_SIZE / 2),
          ],
          speed: 6 + score * 0.2,
          size: ENEMY_SIZE,
          p5,
        })
      );
    }

    p5.image(bImg, offsetX, 0, p5.width, p5.height);
    p5.image(bImg, offsetX + p5.width, 0, p5.width, p5.height);

    offsetX -= offsetXSpeed;
    if (offsetX <= -p5.width) {
      offsetX = 0;
    }
    for (let e of enemies) {
      e.move();
      e.show();
      if (fairy.isHits(e)) {
        stopAudio(backgroundAudio);
        playAudio(gameOverAudio);
        showGameOver();
      }
    }

    enemies = enemies.filter((enemy) => {
      if (enemy.x < -ENEMY_SIZE) {
        score++;
        offsetXSpeed += 0.2;
        return false;
      }

      return true;
    });

    fairy.show();
    fairy.move();
    showScore();
  };
  p5.keyPressed = () => {
    if (p5.key == " ") {
      fairy.jump();
    }
  };

  function showScore() {
    p5.fill(45, 22, 200);
    p5.textSize(20);
    p5.text("SCORE:" + score, 20, 25);
  }

  function showGameOver() {
    setCurrentScreen(2);
    outputScore();

    p5.noLoop();
  }
};

function outputScore() {
  result = "Your score: " + score;
  isid.innerHTML = result;
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
