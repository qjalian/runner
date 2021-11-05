let fairy;
let fImg;
let bImg;
let eImg;
let enemies = [];
let soundClassifier;

function preload() {
  const options = {
    probabilityThreshold: 0.95,
  };
  soundClassifier = ml5.soundClassifier("SpeechCommands18w", options);
  fImg = loadImage("img/ворона.gif");
  bImg = loadImage("img/bg5.jpg");
  eImg = loadImage("img/ene.png");
}

function mousePressed() {
  enemies.push(new Enemy());
}

function setup() {
  createCanvas(800, 450);
  fairy = new Fairy();
  soundClassifier.classify(gotCommand);
}

function gotCommand(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results[0].label, results[0].confidence);
  if (results[0].label == "up") {
    fairy.jump();
  }
}

function keyPressed() {
  if (key == " ") {
    fairy.jump();
  }
}

function draw() {
  if (random(1) < 0.005) {
    enemies.push(new Enemy());
  }
  background(bImg);
  for (let e of enemies) {
    e.move();
    e.show();
    if (fairy.hits(e)) {
      console.log("game over");
      noLoop();
    }
  }
  fairy.show();
  fairy.move();
}