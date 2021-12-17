class Fairy {
  constructor({ initialCords, gravity, size, rangeY }) {
    this.r = size;
    this.x = initialCords[0];
    this.y = initialCords[1];
    this.rangeY = rangeY;

    this.gravity = gravity;
    this.isUp = false;
  }

  jump() {
    this.isUp = !this.isUp;
  }

  isHits(enemy) {
    let x1 = this.x + this.r * 0.25;
    let y1 = this.y + this.r * 0.25;
    let x2 = enemy.x + enemy.r * 0.25;
    let y2 = enemy.y + enemy.r * 0.25;
    return collideCircleCircle(x1, y1, this.r * 0.5, x2, y2, enemy.r * 0.3);
  }

  move() {
    if (this.y <= this.rangeY[0]) {
      // this.isUp = false;
      this.y = this.rangeY[0];
    }

    if (this.y >= this.rangeY[1]) {
      this.y = this.rangeY[1];
    }

    if (this.isUp) {
      this.y -= this.gravity;
    } else {
      this.y += this.gravity;
    }
  }

  show() {
    image(fImg, this.x, this.y, this.r, this.r);
  }
}
