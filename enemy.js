class Enemy {
  constructor() {
    this.r = 120;
    this.x = width;
    this.y = height - this.r;
  }

  move() {
    this.x -= 7;
  }

  show() {
    image(eImg, this.x, this.y, this.r, this.r);
  }
}
