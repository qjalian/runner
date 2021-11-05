const MAX_HEIGHT = 250;
const MIN_HEIGHT = 0;

class Fairy {
  constructor({ initialCords, gravity, radius }) {
    this.r = radius;
    this.x = initialCords[0];
    this.y = initialCords[1];

    this.gravity = gravity;
    this.isUp = false;
  }

  jump() {
    this.isUp = true;
  }

  isHits(enemy) {
    let x1 = this.x + this.r * 0.5;
    let y1 = this.y + this.r * 0.5;
    let x2 = enemy.x + enemy.r * 0.5;
    let y2 = enemy.y + enemy.r * 0.5;
    return collideCircleCircle(x1, y1, this.r, x2, y2, enemy.r);
  }

  move() {
    if (this.y <= MIN_HEIGHT) {
      this.isUp = false;
    }

    if (this.y >= MAX_HEIGHT) {
      this.y = MAX_HEIGHT;
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
